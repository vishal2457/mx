import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { planService } from '../plan.service';

export default Router().get(
  '/detail/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const [result] = await planService.getByID(req.params.id);
    success(res, result, 'Plan Details');
  },
);
