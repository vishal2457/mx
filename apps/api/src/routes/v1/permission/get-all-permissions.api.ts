import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { permissionService } from './permission.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await permissionService.getPermissionList(req.query);
    const count = await permissionService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
