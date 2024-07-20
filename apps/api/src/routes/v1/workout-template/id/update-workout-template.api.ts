import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_workoutTemplate,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { workoutTemplateService } from '../workout-template.service';


export default Router().put(
  '/update/:id',
  validate({
    body: createInsertSchema(TB_workoutTemplate),
    params: v_param_id,
  }),
  async (req, res) => {
    const result = await workoutTemplateService.updateWorkoutTemplate(req.body, req.params.id);
    success(res, result, 'updated');
  }
);
