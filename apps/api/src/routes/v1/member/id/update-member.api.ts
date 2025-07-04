import { Router } from 'express';
import {
  other,
  success,
} from '../../../../shared/api-response/response-handler';
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
    const [existingMember] = await memberService.getByEmail(
      req.body.email,
      req.params.id,
    );
    if (existingMember) {
      return other(res, `Member with email ${req.body.email} already exist`);
    }

    const [result] = await memberService.updateMember(req.body, req.params.id);
    if (req.body.weight && result.weight !== req.body.weight) {
      await memberService.createMemberWeightHistory({
        weight: req.body.weight,
        memberID: req.params.id,
      });
    }
    delete result.passcode;
    success(res, result, 'updated');
  },
);
