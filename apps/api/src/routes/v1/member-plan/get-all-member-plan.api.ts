import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { memberPlanService } from './member-plan.service';

export default Router().get('/all', async (req, res) => {
  const result = await memberPlanService.getAllMemberPlans();
  success(res, result, 'success');
});
