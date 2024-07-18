import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { bodyPartService } from './body-part.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await bodyPartService.getBodyPartList(req.query);
    const count = await bodyPartService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
