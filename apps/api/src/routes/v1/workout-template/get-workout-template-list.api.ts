import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { workoutTemplateService } from './workout-template.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await workoutTemplateService.getWorkoutTemplateList(req.query);
    const count = await workoutTemplateService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
