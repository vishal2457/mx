import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import {
  TB_exercise,
  Z_exerciseBody,
} from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { exerciseService } from './exercise.service';
import { z } from 'zod';
import { db } from '../../../db/db';

export default Router().post(
  '/create',
  validate({
    body: createInsertSchema(TB_exercise).merge(
      z.object({ exerciseBody: Z_exerciseBody.array() }),
    ),
  }),
  async (req, res) => {
    await db.transaction(async (tx) => {
      try {
        const { exerciseBody, ...rest } = req.body;
        const result = await exerciseService.createExercise(rest, tx);
        await exerciseService.addExerciseBody(exerciseBody, tx);
        success(res, result, 'success');
      } catch (error) {
        tx.rollback();
        throw error;
      }
    });
  },
);
