import { createInsertSchema } from 'drizzle-zod';
import { Router } from 'express';
import { TB_memberWorkoutLog } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';

const bodyValidation = createInsertSchema(TB_memberWorkoutLog).array();

export default Router().post(
  '/log-workout',
  secure,
  validate({ body: bodyValidation }),
  async (req, res) => {
    const payload = req.body.map((i) => ({ ...i, memberID: req.user.id }));
    const result = await memberService.createManyWorkoutLogs(payload);
    success(res, result, 'success');
  },
);
