import { Router } from 'express';
import ah from '../../../../shared/async-handler.util';
import { success } from '../../../../shared/api-response/response-handler';
import { db } from '../../../../db/db';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { eq } from 'drizzle-orm';
import { TB_test, v_param_id } from '../../../../../../../libs/mx-schema/src';

export default Router().delete(
  '/delete/:id',
  validate({ params: v_param_id }),
  ah(async (req, res) => {
    const result = await db
      .delete(TB_test)
      .where(eq(TB_test.id, req.params.id));
    success(res, result, 'Deleted successfully');
  })
);
