import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import ah from '../../../shared/async-handler.util';
import { roleService } from './role.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().get(
  '/list',
  secure,
  ah(async (req, res) => {
    const rows = await roleService.getRoleList(
      req.query,
      req.user.organisationID,
    );
    const count = await roleService.getTotalCount();
    success(res, { rows, count }, 'success');
  }),
);
