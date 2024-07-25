import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { exerciseService } from './exercise.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get('/all', secure, async (req, res) => {
  const result = await exerciseService.getAllExercises(req.user.organisationID);
  success(res, result, 'success');
});
