import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { planService } from './plan.service';

export default Router().get('/list', async (req, res) => {
  const rows = await planService.getPlanList(req.query);
  const count = await planService.getTotalCount();
  success(res, { rows, count }, 'success');
});
