import { Router } from 'express';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';

export default Router().get(
  '/todays-workout/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    // get prevoius days workout
  },
);
