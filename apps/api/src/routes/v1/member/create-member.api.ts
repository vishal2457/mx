import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_member } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { memberService } from './member.service';

export default Router().post(
  '/create',
  validate({ body: createInsertSchema(TB_member) }),
  async (req, res) => {
    const result = await memberService.createMember(req.body);
    success(res, result, 'success');
  }
);
