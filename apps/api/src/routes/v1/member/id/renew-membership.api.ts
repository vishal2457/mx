import { addMonths, isAfter, isBefore, parse } from 'date-fns';
import { Router } from 'express';
import { z } from 'zod';
import {
  v_param_id,
  Z_member,
  Z_memberPlan,
  Z_plan,
} from '../../../../../../../libs/mx-schema/src';
import {
  other,
  success,
} from '../../../../shared/api-response/response-handler';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { processEmailQueue } from '../../../../shared/queue/process-email/process-email.queue';
import { memberService } from '../member.service';

const bodyValidator = z.union([
  Z_memberPlan.pick({
    amount: true,
    planName: true,
    periodInMonths: true,
    startDate: true,
    paid: true,
  }),
  Z_plan.pick({ periodInMonths: true }),
  Z_member.pick({ email: true }),
]);

export default Router().post(
  '/renew-membership/:id',
  secure,
  validate({ params: v_param_id, body: bodyValidator }),
  async (req, res) => {
    const memberID = parseInt(req.params.id);
    const membership = await memberService.getActiveMemberShip(memberID);
    if (
      isAfter(
        membership[0].endDate,
        parse(req.body.startDate, 'yyyy-MM-dd', new Date()),
      )
    ) {
      return other(res, 'New membership cannot start before previous one Ends');
    }
    const { amount, planName, periodInMonths } = req.body;

    const memberPlanPayload = {
      amount,
      planName,
      periodInMonths,
      memberID,
      endDate: addMonths(req.body.startDate, req.body.periodInMonths),
      startDate: parse(req.body.startDate, 'yyyy-MM-dd', new Date()),
      paid: req.body.paid,
    };
    // add member plan
    await memberService.addPlan(memberPlanPayload);
    await processEmailQueue.sendEmail({
      to: req.body.email,
      subject: 'New membership added',
      html: `Your membership added,starts on ${memberPlanPayload.startDate} expires on ${memberPlanPayload.endDate}`,
    });

    success(res, membership, 'Membership renewed');
  },
);
