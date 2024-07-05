import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { rolePermissionService } from './rolePermission.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await rolePermissionService.getRolePermissionList(req.query);
    const count = await rolePermissionService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
