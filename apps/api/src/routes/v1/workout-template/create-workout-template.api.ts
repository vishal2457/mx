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
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().post(
  '/create',
  secure,
  validate({
    body: createInsertSchema(TB_workoutTemplate)
      .omit({ organisationID: true })
      .merge(
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
        { ...rest, organisationID: req.user.organisationID },
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
