import { Router } from 'express';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';

export default Router().get(
  '/active-membership/:id',
  validate({ params: v_param_id }),
  secure,
  async (req, res) => {
    const [result] = await memberService.getActiveMemberShip(
      parseInt(req.params.id),
    );
    success(res, result, 'Membership Details');
  },
);
