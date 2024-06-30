import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { userService } from './user.service';

export default Router().get('/list', async (req, res) => {
  const count = await userService.getTotalUserCount();
  const rows = await userService.getUserList(req.query);
  success(res, { rows: rows, count }, 'success');
});
