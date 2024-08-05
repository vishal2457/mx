import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { memberService } from '../member.service';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_memberWorkoutLog,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';

const bodyValidation = createInsertSchema(TB_memberWorkoutLog);

export default Router().post(
  '/log-workout/:id',
  secure,
  validate({ params: v_param_id, body: bodyValidation }),
  async (req, res) => {
    const result = await memberService.createManyWorkoutLogs(req.body);
    success(res, result, 'success');
  },
);
