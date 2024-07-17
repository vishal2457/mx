import { Router } from 'express';
import {
  v_param_id,
  Z_memberWeightHistory,
} from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';

export default Router().put(
  '/weight/:id',
  validate({
    body: Z_memberWeightHistory.pick({
      weight: true,
    }),
    params: v_param_id,
  }),
  async (req, res) => {
    const result = await memberService.updateMember(req.body, req.params.id);
    await memberService.createMemberWeightHistory({
      weight: req.body.weight,
      memberID: req.params.id,
    });
    success(res, result, 'updated');
  },
);
