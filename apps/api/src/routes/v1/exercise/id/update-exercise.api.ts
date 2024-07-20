import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_exercise,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { exerciseService } from '../exercise.service';
import { db } from '../../../../db/db';

export default Router().put(
  '/update/:id',
  validate({
    body: createInsertSchema(TB_exercise),
    params: v_param_id,
  }),
  async (req, res) => {
    await db.transaction(async (tx) => {
      const { bodyPartID, ...rest } = req.body;
      const result = await exerciseService.updateExercise(
        rest,
        req.params.id,
        tx,
      );
      await exerciseService.deleteExerciseBody(req.params.id, tx);
      await exerciseService.addExerciseBody(
        bodyPartID.map((i) => ({ exerciseID: req.params.id, bodyPartID: i })),
        tx,
      );
      success(res, result, 'updated');
    });
  },
);
