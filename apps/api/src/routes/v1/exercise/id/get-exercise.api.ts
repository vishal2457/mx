import { Router } from 'express';
import {
  notFound,
  success,
} from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { exerciseService } from '../exercise.service';

export default Router().get(
  '/detail/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const result = await exerciseService.getByID(req.params.id);
    if (!result.length) {
      return notFound(res, 'Exercise details not found');
    }
    const { exercise, exerciseBody } = result[0];

    const response = {
      ...exercise,
      bodyPartID: exerciseBody
        ? result.map((r) => r.exerciseBody.bodyPartID)
        : [],
    };
    success(res, response, 'Exercise Details');
  },
);
