import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { planService } from './plan.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get('/all', secure, async (req, res) => {
  const result = await planService.getAllPlans(req.user.organisationID);
  success(res, result, 'success');
});
