import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { eventService } from './event.service';

export default Router().get('/all', async (req, res) => {
  const result = await eventService.getAllEvents();
  success(res, result, 'success');
});
