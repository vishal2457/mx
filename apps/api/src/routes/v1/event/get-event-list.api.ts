import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { eventService } from './event.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await eventService.getEventList(req.query);
    const count = await eventService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
