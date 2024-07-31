import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { workoutTemplateService } from './workout-template.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get('/all', secure, async (req, res) => {
  const result = await workoutTemplateService.getAllActiveWorkoutTemplates(
    req.user.organisationID,
  );
  success(res, result, 'success');
});
