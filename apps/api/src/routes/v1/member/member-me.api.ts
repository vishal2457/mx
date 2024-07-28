import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';
import { memberService } from './member.service';

export default Router().get('/me', secure, async (req, res) => {
  const member = await memberService.getByID(req.user.id);

  success(res, { member }, 'Member info');
});
