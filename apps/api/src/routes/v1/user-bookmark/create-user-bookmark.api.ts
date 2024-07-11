import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_userBookmark } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { userBookmarkService } from './user-bookmark.service';

export default Router().post(
  '/create',
  validate({ body: createInsertSchema(TB_userBookmark) }),
  async (req, res) => {
    const result = await userBookmarkService.createUserBookmark(req.body);
    success(res, result, 'success');
  }
);
