import { createInsertSchema } from 'drizzle-zod';
import { Router } from 'express';
import { TB_member } from '../../../../../../libs/mx-schema/src';
import { success } from '../../../shared/api-response/response-handler';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { memberService } from './member.service';

export default Router().post(
  '/create',
  secure,
  validate({
    body: createInsertSchema(TB_member).omit({ organisationID: true }),
  }),
  async (req, res) => {
    const payload: typeof TB_member.$inferInsert = {
      organisationID: req.user.organisationID,
      ...req.body,
    };
    const result = await memberService.createMember(payload);
    success(res, result, 'success');
  },
);
