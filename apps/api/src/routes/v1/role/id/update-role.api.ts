import { Router } from 'express';
import ah from '../../../../shared/async-handler.util';
import { success } from '../../../../shared/api-response/response-handler';
import { db } from '../../../../db/db';
import { eq } from 'drizzle-orm';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_role,
  v_param_id,
  Z_role_insert,
} from '../../../../../../../libs/mx-schema/src';

export default Router().post(
  '/update/:id',
  validate({
    body: Z_role_insert.omit({ password: true, id: true }),
    params: v_param_id,
  }),
  ah(async (req, res) => {
    const result = await db
      .update(TB_role)
      .set(req.body)
      .where(eq(TB_role.id, req.params.id))
      .returning();

    success(res, result, 'updated');
  })
);
