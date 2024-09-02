import { Router } from 'express';
import { secure } from '../../../../shared/jwt/jwt-auth.middleware';
import { memberService } from '../member.service';
import { success } from '../../../../shared/api-response/response-handler';

export default Router().get('/at-risk', secure, async (req, res) => {
  const result = await memberService.getAtRisk(req.user.organisationID);
  success(res, result, 'success');
});
