import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';
import { memberService } from '../member.service';

export default Router().get(
  '/calories-burnt-last-seven-days',
  secure,
  async (req, res) => {
    const result = await memberService.getCaloriesBurntLastSevenDays(
      req.user.id,
    );

    success(res, result, 'Workout count');
  },
);
