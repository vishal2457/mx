import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import {
  TB_workoutTemplate,
  TB_workoutTemplateDetail,
} from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { workoutTemplateService } from './workout-template.service';
import { z } from 'zod';
import { db } from '../../../db/db';

export default Router().post(
  '/create',
  validate({
    body: createInsertSchema(TB_workoutTemplate).merge(
      z.object({
        workoutDetails: createInsertSchema(TB_workoutTemplateDetail)
          .omit({ workoutTemplateID: true })
          .array(),
      }),
    ),
  }),
  async (req, res) => {
    await db.transaction(async (tx) => {
      const { workoutDetails, ...rest } = req.body;
      const [result] = await workoutTemplateService.createWorkoutTemplate(
        rest,
        tx,
      );
      const workoutDetailPayload = workoutDetails.map((i) => ({
        ...i,
        workoutTemplateID: result.id,
      }));
      await workoutTemplateService.addWorkoutDetails(workoutDetailPayload, tx);
      success(res, result, 'success');
    });
  },
);
