import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  STATUS_ENUM,
  TB_enquiry,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { enquiryService } from '../enquiry.service';
import { db } from '../../../../db/db';
import { z } from 'zod';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';

const validateBody = createInsertSchema(TB_enquiry)
  .omit({ organisationID: true })
  .extend({ oldStatusValue: z.enum(STATUS_ENUM) });

export default Router().put(
  '/update/:id',
  validate({
    body: validateBody,
    params: v_param_id,
  }),
  secure,
  async (req, res) => {
    db.transaction(async (tx) => {
      const result = await enquiryService.updateEnquiry(
        req.body,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req.params.id,
        tx,
      );
      if (req.body.oldStatusValue !== req.body.status) {
        await enquiryService.addEnquiryStatusHistory(
          {
            userID: req.user.id,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            enquiryID: req.params.id,
            status: req.body.oldStatusValue,
          },
          tx,
        );
      }

      success(res, result, 'Updated');
    });
  },
);
