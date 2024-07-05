import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { userRoleService } from './userRole.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await userRoleService.getUserRoleList(req.query);
    const count = await userRoleService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
