import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { TB_member, v_param_id } from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { memberService } from '../member.service';

export default Router().put(
  '/update/:id',
  validate({
    body: createInsertSchema(TB_member).omit({
      organisationID: true,
      joinDate: true,
      weight: true,
      age: true,
      height: true,
      passcode: true,
    }),
    params: v_param_id,
  }),
  async (req, res) => {
    const result = await memberService.updateMember(req.body, req.params.id);
    success(res, result, 'updated');
  },
);
