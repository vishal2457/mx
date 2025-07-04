import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';
import { memberService } from '../member.service';

export default Router().get(
  '/workout-count-last-seven-days',
  secure,
  async (req, res) => {
    const result = await memberService.getMemberWorkoutCountLastSevenDays(
      req.user.id,
    );

    success(res, result, 'Workout count');
  },
);
