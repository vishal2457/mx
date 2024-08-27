import { Router } from 'express';
import {
  success,
  unauthorized,
} from '../../../shared/api-response/response-handler';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';
import { userService } from './user.service';
import { roleService } from '../role/role.service';

export default Router().get('/me', secure, async (req, res) => {
  const permissions = await roleService.getRolePermissionByUserID(req.user.id);
  const [result] = await userService.getUserByID(req.user.id);
  if (!result) {
    return unauthorized(res, 'User not found');
  }
  delete result.user.password;
  success(res, { permissions, ...result }, 'User info');
});
