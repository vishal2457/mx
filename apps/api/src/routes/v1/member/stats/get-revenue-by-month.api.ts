import { Router } from 'express';
import { z } from 'zod';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { memberService } from '../member.service';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';

const validateQuery = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export default Router().get(
  '/revenue-by-month',
  validate({
    query: validateQuery,
  }),
  secure,
  async (req, res) => {
    const { month, year } = validateQuery.parse(req.query);
    const [result] = await memberService.getRevenueByMonth({
      month,
      year,
      organisationID: req.user.organisationID,
    });
    success(res, result, 'Member Details');
  },
);
