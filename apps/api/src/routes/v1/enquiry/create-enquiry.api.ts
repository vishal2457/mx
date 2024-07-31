import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_enquiry } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { enquiryService } from './enquiry.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().post(
  '/create',
  secure,
  validate({
    body: createInsertSchema(TB_enquiry).omit({ organisationID: true }),
  }),
  async (req, res) => {
    const result = await enquiryService.createEnquiry({
      ...req.body,
      organisationID: req.user.organisationID,
    });
    success(res, result, 'success');
  },
);
