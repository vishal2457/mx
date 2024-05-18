import { Router } from 'express';
import ah from '../../../shared/async-handler.util';
import { success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import { validate } from '../../../shared/middlewares/validation.middleware';
import {
  c_pagination,
  v_pagination,
} from '../../../../../../libs/mx-schema/src';

export default Router().get(
  '/list',
  validate({ query: v_pagination }),
  ah(async (req, res) => {
    const { limit, offset } = c_pagination({
      limit: req.query.limit,
      page: req.query.page,
    });
    const notifications = await db.query.TB_notification.findMany({
      limit,
      offset,
    });
    success(res, notifications, 'success');
  })
);
