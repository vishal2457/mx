import { createInsertSchema } from 'drizzle-zod';
import { Router } from 'express';
import { TB_enquiry } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { success } from '../../../shared/api-response/response-handler';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { enquiryService } from './enquiry.service';

const validateBody = createInsertSchema(TB_enquiry).omit({
  organisationID: true,
});

export default Router().post(
  '/create',
  secure,
  validate({
    body: validateBody,
  }),
  async (req, res) => {
    db.transaction(async (tx) => {
      const [result] = await enquiryService.createEnquiry(
        {
          ...req.body,
          organisationID: req.user.organisationID,
        },
        tx,
      );
      await enquiryService.addEnquiryStatusHistory(
        {
          userID: req.user.id,
          enquiryID: result.id,
          status: req.body.status,
        },
        tx,
      );

      success(res, result, 'success');
    });
  },
);
