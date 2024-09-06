import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { workoutTemplateService } from './workout-template.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get('/list', secure, async (req, res) => {
  const rows = await workoutTemplateService.getWorkoutTemplateList(
    req.query,
    req.user.organisationID,
  );
  const [{ count }] = await workoutTemplateService.getTotalCount(
    req.user.organisationID,
  );
  success(res, { rows, count }, 'success');
});
