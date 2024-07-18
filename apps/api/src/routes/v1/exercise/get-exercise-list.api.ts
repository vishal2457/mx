import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { exerciseService } from './exercise.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await exerciseService.getExerciseList(req.query);
    const count = await exerciseService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
