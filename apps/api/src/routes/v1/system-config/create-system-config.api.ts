import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_systemConfig } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { systemConfigService } from './system-config.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().post(
  '/create',
  secure,
  validate({
    body: createInsertSchema(TB_systemConfig).omit({ organisationID: true }),
  }),
  async (req, res) => {
    const result = await systemConfigService.createSystemConfig({
      ...req.body,
      organisationID: req.user.organisationID,
    });
    success(res, result, 'success');
  },
);
