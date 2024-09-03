import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_plan } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { planService } from './plan.service';

export default Router().post(
  '/create',
  validate({ body: createInsertSchema(TB_plan) }),
  async (req, res) => {
    const result = await planService.createPlan(req.body);
    success(res, result, 'success');
  },
);
