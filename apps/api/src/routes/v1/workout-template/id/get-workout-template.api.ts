import { Router } from 'express';
import {
  notFound,
  success,
} from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { workoutTemplateService } from '../workout-template.service';

export default Router().get(
  '/detail/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const result = await workoutTemplateService.getByID(req.params.id);
    if (!result.length) {
      return notFound(res, 'Workout template details not found');
    }
    const { workoutTemplate, workoutTemplateDetail } = result[0];
    const response = {
      ...workoutTemplate,
      workoutTemplateDetail: workoutTemplateDetail
        ? result.map((i) => ({
            ...i.workoutTemplateDetail,
            exerciseName: i.exercise.name,
          }))
        : [],
    };
    success(res, response, 'WorkoutTemplate Details');
  },
);
