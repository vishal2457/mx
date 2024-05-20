import { Router } from 'express';
import ah from '../../../shared/async-handler.util';
import { success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import { validate } from '../../../shared/middlewares/validation.middleware';
import {
  c_pagination,
  TB_user,
  v_pagination,
} from '../../../../../../libs/mx-schema/src';
import { getTotalCount } from '../../../db/utils-db/count-rows';

export default Router().get(
  '/list',
  validate({ query: v_pagination }),
  ah(async (req, res) => {
    const { limit, offset } = c_pagination({
      limit: req.query.limit,
      page: req.query.page,
    });
    const count = await getTotalCount(TB_user);
    const users = await db.query.TB_user.findMany({ limit, offset });
    success(res, { rows: users, count }, 'success');
  })
);
