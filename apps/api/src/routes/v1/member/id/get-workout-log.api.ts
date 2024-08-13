import { Router } from 'express';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';

export default Router().get(
  '/workout-log-list/:id',
  validate({ params: v_param_id }),
  async (req, res) => {
    const result = await memberService.memberWorkoutLog(
      req.query,
      req.params.id,
    );
    const [{ count }] = await memberService.memberWorkoutLogCount(
      req.params.id,
    );
    success(res, { rows: result, count }, 'Member Workout Log List');
  },
);
