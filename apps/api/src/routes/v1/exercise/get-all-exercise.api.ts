import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { exerciseService } from './exercise.service';

export default Router().get('/all', async (req, res) => {
  const result = await exerciseService.getAllExercises();
  success(res, result, 'success');
});
