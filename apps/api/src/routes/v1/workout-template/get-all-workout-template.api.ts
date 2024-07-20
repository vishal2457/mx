import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { workoutTemplateService } from './workout-template.service';

export default Router().get('/all', async (req, res) => {
  const result = await workoutTemplateService.getAllActiveWorkoutTemplates();
  success(res, result, 'success');
});
