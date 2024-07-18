import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_exercise } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { exerciseService } from './exercise.service';

export default Router().post(
  '/create',
  validate({ body: createInsertSchema(TB_exercise) }),
  async (req, res) => {
    const result = await exerciseService.createExercise(req.body);
    success(res, result, 'success');
  }
);
