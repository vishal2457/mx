import { Router } from 'express';
import ah from '../../../../shared/async-handler.util';
import { success } from '../../../../shared/api-response/response-handler';
import { db } from '../../../../db/db';
import { eq } from 'drizzle-orm';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { TB_adminUser } from '../../../../db/schema/admin-user.schema';

export default Router().post(
  '/update/:id',
  ah(async (req, res) => {
    const result = await db
      .update(TB_adminUser)
      .set(req.body)
      .where(eq(TB_adminUser.id, req.params.id))
      .returning();

    success(res, result, 'updated');
  })
);
