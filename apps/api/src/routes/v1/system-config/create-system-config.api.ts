import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_systemConfig } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { systemConfigService } from './system-config.service';

export default Router().post(
  '/create',
  validate({ body: createInsertSchema(TB_systemConfig) }),
  async (req, res) => {
    const result = await systemConfigService.createSystemConfig(req.body);
    success(res, result, 'success');
  }
);
