import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_exercise,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { exerciseService } from '../exercise.service';


export default Router().put(
  '/update/:id',
  validate({
    body: createInsertSchema(TB_exercise),
    params: v_param_id,
  }),
  async (req, res) => {
    const result = await exerciseService.updateExercise(req.body, req.params.id);
    success(res, result, 'updated');
  }
);
