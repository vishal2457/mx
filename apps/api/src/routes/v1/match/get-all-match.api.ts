import { Router } from 'express';
import ah from '../../../shared/async-handler.util';
import { success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import { validate } from '../../../shared/middlewares/validation.middleware';
import {
  c_pagination,
  TB_match,
  v_pagination,
} from '../../../../../../libs/mx-schema/src';
import { eq } from 'drizzle-orm';
import { safeParse } from '../../../../../../libs/helpers/src';

export default Router().get(
  '/list',
  validate({ query: v_pagination }),
  ah(async (req, res) => {
    const { limit, offset } = c_pagination({
      limit: req.query.limit,
      page: req.query.page,
    });
    const query = db.select().from(TB_match).$dynamic();

    if (limit && offset) {
      query.limit(limit).offset(offset);
    }
    const filters = safeParse(req.query.filters);
    if (filters?.length) {
      for (const filter of filters) {
        query.where(eq(TB_match[filter.field], filter.value));
      }
    }

    const matches = await query.execute();

    success(res, { rows: matches, count: 10 }, 'success');
  })
);
