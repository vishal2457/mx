import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { exerciseService } from './exercise.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get('/list', secure, async (req, res) => {
  const rows = await exerciseService.getExerciseList(
    req.query,
    req.user.organisationID,
  );
  const count = await exerciseService.getTotalCount();
  success(res, { rows, count }, 'success');
});
