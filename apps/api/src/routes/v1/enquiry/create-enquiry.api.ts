import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_enquiry } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { enquiryService } from './enquiry.service';

export default Router().post(
  '/create',
  validate({ body: createInsertSchema(TB_enquiry) }),
  async (req, res) => {
    const result = await enquiryService.createEnquiry(req.body);
    success(res, result, 'success');
  }
);
