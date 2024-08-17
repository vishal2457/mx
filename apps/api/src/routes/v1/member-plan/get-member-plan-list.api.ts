import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { memberPlanService } from './member-plan.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await memberPlanService.getMemberPlanList(req.query);
    const count = await memberPlanService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
