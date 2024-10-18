import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { userService } from './user.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get('/all', secure, async (req, res) => {
  const users = await userService.getAll(req.user.organisationID);
  success(res, users, 'success');
});
