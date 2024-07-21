import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_workoutTemplate,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { workoutTemplateService } from '../workout-template.service';
import { db } from '../../../../db/db';

export default Router().put(
  '/update/:id',
  validate({
    body: createInsertSchema(TB_workoutTemplate),
    params: v_param_id,
  }),
  async (req, res) => {
    await db.transaction(async (tx) => {
      const { workoutDetails, ...rest } = req.body;
      const [result] = await workoutTemplateService.updateWorkoutTemplate(
        rest,
        req.params.id,
        tx,
      );
      await workoutTemplateService.deleteWorkoutTemplateDetails(
        req.params.id,
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
