import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { systemConfigService } from '../system-config.service';

export default Router().get(
  '/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const result = await systemConfigService.getByID(req.params.id);
    success(res, result, 'SystemConfig Details');
  }
);
