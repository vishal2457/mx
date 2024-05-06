import { Router } from 'express';
import ah from '../../../../shared/async-handler.util';
import { success } from '../../../../shared/api-response/response-handler';
import { TB_adminUser } from '../../../../db/schema/admin-user.schema';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { db } from '../../../../db/db';
import { v_admin_user } from '@maximus/mx-models';

export default Router().post(
  '/create',
  validate({ body: v_admin_user.omit({ active: true, id: true }) }),
  ah(async (req, res) => {
    const result = await db.insert(TB_adminUser).values(req.body).returning();
    success(res, result, 'success');
  })
);
