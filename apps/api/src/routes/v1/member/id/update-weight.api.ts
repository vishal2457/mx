import { Router } from 'express';
import { z } from 'zod';
import {
  v_param_id,
  Z_memberWeightHistory,
} from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';

const bodySchema = Z_memberWeightHistory.pick({
  weight: true,
}).extend({
  weightGoal: z.string().optional(),
  previousWeight: z.string().optional(),
});

export default Router().put(
  '/weight/:id',
  validate({
    body: bodySchema,
    params: v_param_id,
  }),
  async (req, res) => {
    const [result] = await memberService.updateMember(req.body, req.params.id);

    if (req.body.previousWeight !== req.body.weight) {
      await memberService.createMemberWeightHistory({
        weight: req.body.weight,
        memberID: req.params.id,
      });
    }

    success(res, result, 'updated');
  },
);
