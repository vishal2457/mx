import { Router } from 'express';
import ah from '../../../../shared/async-handler.util';
import { success } from '../../../../shared/api-response/response-handler';
import { TB_adminUser } from '../../../../db/schema/admin-user.schema';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { db } from '../../../../db/db';

export default Router().post(
  '/create',
  ah(async (req, res) => {
    const result = await db.insert(TB_adminUser).values(req.body).returning();
    success(res, result, 'success');
  })
);
