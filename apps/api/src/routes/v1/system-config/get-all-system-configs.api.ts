import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { systemConfigService } from './system-config.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await systemConfigService.getSystemConfigList(req.query);
    const count = await systemConfigService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
