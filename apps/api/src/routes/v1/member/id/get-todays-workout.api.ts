import { Router } from 'express';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { workoutTemplateService } from '../../workout-template/workout-template.service';
import { getNextDay } from '../helpers/get-next-day.helper';

export default Router().get(
  '/todays-workout/:id',
  secure,
  validate({ params: v_param_id }),
  async (req, res) => {
    const [lastWorkout] = await workoutTemplateService.getLastWorkoutDay(
      Number(req.params.id),
    );

    const [totalWorkoutCount] =
      await workoutTemplateService.getWorkoutTemplateDetailCount(
        req.user.workoutTemplateID,
      );

    const nextDay = getNextDay(lastWorkout?.day, totalWorkoutCount.count);

    const todaysWorkout = await workoutTemplateService.getTodaysWorkout(
      nextDay,
      req.user.workoutTemplateID,
      req.user.id,
    );

    success(res, todaysWorkout, 'Todays workout');
  },
);
