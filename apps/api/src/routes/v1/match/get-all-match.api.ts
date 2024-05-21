import { Router } from 'express';
import { TB_match, v_pagination } from '../../../../../../libs/mx-schema/src';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import handler from '../../../shared/async-handler.util';

export default Router().get(
  '/list',
  validate({ query: v_pagination }),
  handler(async (req, res) => {
    const count = getTotalCount(TB_match);
    const query = getListQueryWithFilters(TB_match, req.query);
    const matches = await query.execute();
    success(res, { rows: matches, count: count }, 'success');
  })
);
