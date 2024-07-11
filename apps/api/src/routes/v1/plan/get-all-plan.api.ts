import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { planService } from './plan.service';

export default Router().get('/all', async (req, res) => {
  const result = await planService.getAllPlans();
  success(res, result, 'success');
});
