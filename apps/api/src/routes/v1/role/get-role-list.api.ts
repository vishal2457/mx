import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import ah from '../../../shared/async-handler.util';
import { roleService } from './role.service';

export default Router().get(
  '/list',
  ah(async (req, res) => {
    const rows = await roleService.getRoleList(req.query);
    const count = await roleService.getTotalCount();
    success(res, { rows, count }, 'success');
  })
);
