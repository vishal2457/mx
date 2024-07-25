import { createInsertSchema } from 'drizzle-zod';
import { Router } from 'express';
import { z } from 'zod';
import { TB_exercise } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { exerciseService } from './exercise.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().post(
  '/create',
  secure,
  validate({
    body: createInsertSchema(TB_exercise)
      .omit({ organisationID: true })
      .merge(z.object({ bodyPartID: z.number().array() })),
  }),
  async (req, res) => {
    await db.transaction(async (tx) => {
      try {
        const { bodyPartID, ...rest } = req.body;
        const [result] = await exerciseService.createExercise(
          { ...rest, organisationID: req.user.organisationID },
          tx,
        );
        await exerciseService.addExerciseBody(
          bodyPartID.map((i) => ({ exerciseID: result.id, bodyPartID: i })),
          tx,
        );
        success(res, result, 'success');
      } catch (error) {
        tx.rollback();
        throw error;
      }
    });
  },
);
