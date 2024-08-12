import { Router } from 'express';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';
import { z } from 'zod';

export default Router().get(
  '/last-n-months-workout-logs/:id',
  validate({
    params: v_param_id,
    query: z.object({ months: z.coerce.number().optional() }),
  }),
  async (req, res) => {
    const result = await memberService.getLastNMonthsWorkoutLogs(
      req.params.id,
      req.query.months,
    );
    success(res, result, 'Last N months workout details');
  },
);
