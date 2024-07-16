import { Router } from 'express';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';

export default Router().get(
  '/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const result = await memberService.getByID(req.params.id);

    const memberData = result.reduce<any>((acc, curr) => {
      if (acc.id === curr.member.id) {
        acc.memberPlan.push(curr.memberPlan);
      } else {
        acc = curr.member;
        if (curr.memberPlan) {
          acc.memberPlan = [
            {
              ...curr.memberPlan,
              planName: curr.plan?.name,
              amount: curr.plan?.amount,
            },
          ];
        }
      }
      return acc;
    }, {});

    success(res, memberData, 'Member Details');
  },
);
