import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import ah from '../../../shared/async-handler.util';
import { roleService } from './role.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get(
  '/all',
  secure,
  ah(async (req, res) => {
    const roles = await roleService.getAllRoles(req.user.organisationID);
    success(res, roles, 'success');
  }),
);
