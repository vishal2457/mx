import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { userService } from './user.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get('/list', secure, async (req, res) => {
  const [{ count }] = await userService.getTotalUserCount(
    req.user.organisationID,
  );
  const rows = await userService.getUserList(
    req.query,
    req.user.organisationID,
  );
  success(res, { rows: rows, count }, 'success');
});
