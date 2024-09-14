import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';
import { memberService } from './member.service';

export default Router().get('/me', secure, async (req, res) => {
  const [result] = await memberService.getByID(req.user.id);
  const response = {
    ...result.member,
    organisation: result.organisation,
    trainer: result.user,
  };
  success(res, response, 'Member info');
});
