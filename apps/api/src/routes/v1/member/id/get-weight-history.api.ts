import { Router } from 'express';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';

export default Router().get(
  '/weight-history/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const result = await memberService.getWeightHistory(req.params.id);
    success(res, result, 'Member weight history');
  },
);
