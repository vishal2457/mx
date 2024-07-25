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
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';
import { z } from 'zod';

export default Router().put(
  '/update/:id',
  secure,
  validate({
    params: v_param_id,
    body: createInsertSchema(TB_exercise)
      .omit({ organisationID: true })
      .merge(z.object({ bodyPartID: z.number().array() })),
  }),
  async (req, res) => {
    await db.transaction(async (tx) => {
      const { bodyPartID, ...rest } = req.body;
      const { id: exerciseID } = v_param_id.parse(req.params.id);

      const result = await exerciseService.updateExercise(rest, exerciseID, tx);
      await exerciseService.deleteExerciseBody(exerciseID, tx);
      await exerciseService.addExerciseBody(
        bodyPartID.map((i) => ({ exerciseID, bodyPartID: i })),
        tx,
      );
      success(res, result, 'updated');
    });
  },
);
