import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_event,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { eventService } from '../event.service';


export default Router().put(
  '/update/:id',
  validate({
    body: createInsertSchema(TB_event),
    params: v_param_id,
  }),
  async (req, res) => {
    const result = await eventService.updateEvent(req.body, req.params.id);
    success(res, result, 'updated');
  }
);
