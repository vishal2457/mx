import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_bodyPart } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { bodyPartService } from './body-part.service';

export default Router().post(
  '/create',
  validate({ body: createInsertSchema(TB_bodyPart) }),
  async (req, res) => {
    const result = await bodyPartService.createBodyPart(req.body);
    success(res, result, 'success');
  }
);
