import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_plan,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { planService } from '../plan.service';


export default Router().put(
  '/update/:id',
  validate({
    body: createInsertSchema(TB_plan),
    params: v_param_id,
  }),
  async (req, res) => {
    const result = await planService.updatePlan(req.body, req.params.id);
    success(res, result, 'updated');
  }
);
