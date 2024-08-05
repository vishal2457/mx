import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';
import { memberService } from '../member.service';

export default Router().get(
  '/last-n-month-revenue',
  secure,
  secure,
  async (req, res) => {
    const result = await memberService.getLastNMonthRevenue(
      req.user.organisationID,
    );
    success(res, result, `Last ${req.params.months} months revenue`);
  },
);
