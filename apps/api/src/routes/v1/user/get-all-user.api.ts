import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { userService } from './user.service';

export default Router().get('/all', async (req, res) => {
  const users = await userService.getAll();
  success(res, users, 'success');
});
