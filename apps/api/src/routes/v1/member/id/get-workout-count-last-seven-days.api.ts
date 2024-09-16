import { Router } from 'express';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';

export default Router().get(
  '/workout-count-last-seven-days/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const result = await memberService.getMembershipByMemberID(req.params.id);
    const [{ count }] = await memberService.getMemberShipCountByMemberID(
      req.params.id,
    );
    success(res, { rows: result, count }, 'Membership list for single member');
  },
);
