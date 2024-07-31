import { Router } from 'express';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';
import { memberService } from '../member.service';
import { success } from '../../../../shared/api-response/response-handler';

export default Router().get('/count', secure, async (req, res) => {
  const [countResult] = await memberService.getTotalCount(
    req.user.organisationID,
    true,
  );
  success(res, countResult, 'success');
});
