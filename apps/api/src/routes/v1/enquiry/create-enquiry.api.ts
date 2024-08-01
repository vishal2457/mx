import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import {
  GOAL,
  STATUS_ENUM,
  TB_enquiry,
} from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { enquiryService } from './enquiry.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';
import { db } from '../../../db/db';
import { z } from 'zod';

const validateBody = createInsertSchema(TB_enquiry)
  .omit({ organisationID: true })
  .extend({ oldStatusValue: z.enum(STATUS_ENUM) });

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
      if (req.body.oldStatusValue !== req.body.status) {
        await enquiryService.addEnquiryStatusHistory(
          {
            userID: req.user.id,
            enquiryID: result.id,
            status: req.body.oldStatusValue,
          },
          tx,
        );
      }
      success(res, result, 'success');
    });
  },
);
