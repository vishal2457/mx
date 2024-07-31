import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';
import { rolePermissionService } from '../rolePermission/rolePermission.service';
import { userService } from './user.service';

export default Router().get('/me', secure, async (req, res) => {
  const permissions = await rolePermissionService.getPermissionByUserID(
    req.user.id,
  );
  const [result] = await userService.getUserByID(req.user.id);
  success(res, { permissions, ...result }, 'User info');
});
