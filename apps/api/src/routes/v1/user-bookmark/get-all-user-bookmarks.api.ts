import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { userBookmarkService } from './user-bookmark.service';


export default Router().get(
  '/list',
  async (req, res) => {
    const rows = await userBookmarkService.getUserBookmarkList(req.query);
    const count = await userBookmarkService.getTotalCount();
    success(res, {rows, count}, 'success');
  }
);
