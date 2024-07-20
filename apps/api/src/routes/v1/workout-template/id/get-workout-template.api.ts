import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { workoutTemplateService } from '../workout-template.service';

export default Router().get(
  '/detail/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const result = await workoutTemplateService.getByID(req.params.id);
    success(res, result, 'WorkoutTemplate Details');
  }
);
