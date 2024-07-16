import { createInsertSchema } from 'drizzle-zod';
import { Router } from 'express';
import { z } from 'zod';
import {
  TB_member,
  TB_memberPlan,
  Z_plan,
} from '../../../../../../libs/mx-schema/src';
import { other, success } from '../../../shared/api-response/response-handler';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { memberService } from './member.service';
import { addMonths, parse } from 'date-fns';
import { processEmailQueue } from '../../../shared/queue/process-email/process-email.queue';

const bodyValidator = z.union([
  createInsertSchema(TB_member).omit({ organisationID: true }),
  createInsertSchema(TB_memberPlan).pick({ planID: true }),
  Z_plan.pick({ periodInMonths: true }),
]);

export default Router().post(
  '/create',
  secure,
  validate({
    body: bodyValidator,
  }),
  async (req, res) => {
    const member = await memberService.getByEmail(req.body.email);
    if (member) {
      return other(res, `Member with email ${req.body.email} already exist`);
    }

    const payload: typeof TB_member.$inferInsert = {
      organisationID: req.user.organisationID,
      ...req.body,
    };
    const newMember = await memberService.createMember(payload);

    const memberPlanPayload = {
      planID: req.body.planID,
      memberID: newMember[0].id,
      endDate: addMonths(payload.joinDate, req.body.periodInMonths),
      startDate: parse(payload.joinDate, 'yyyy-MM-dd', new Date()),
    };
    // add member plan
    await memberService.addPlan(memberPlanPayload);

    await processEmailQueue.sendEmail({
      to: req.body.email,
      subject: 'New membership activated',
      html: `Your membership activated, till ${memberPlanPayload.endDate}`,
    });

    success(res, newMember, 'success');
  },
);
