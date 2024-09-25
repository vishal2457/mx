import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_event } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { eventService } from './event.service';
import { ImageUpload } from '../../../shared/middlewares/multer.middleware';

export default Router().post(
  '/create',
  ImageUpload.single('image'),
  // validate({ body: createInsertSchema(TB_event) }),
  async (req, res) => {
    const result = await eventService.createEvent({
      ...req.body,
      image: req.file?.filename,
    });
    success(res, result, 'success');
  },
);
