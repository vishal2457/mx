import { Router } from 'express';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';

export default Router().delete(
  '/delete-member-workout/:id',
  validate({ params: v_param_id }),
  secure,
  async (req, res) => {
    await memberService.deleteWorkoutLog(parseInt(req.params.id));
    success(res, null, 'success');
  },
);
