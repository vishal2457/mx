import { Router } from 'express';
import { TB_customer, Z_customer } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import ah from '../../../shared/async-handler.util';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { success } from '../../../shared/api-response/response-handler';
import { eq } from 'drizzle-orm';

export default Router().post(
  '/sub-to-prime-team',
  validate({ body: Z_customer.pick({ primeSubscribed: true, id: true }) }),
  ah(async (req, res) => {
    const result = await db
      .update(TB_customer)
      .set({ primeSubscribed: req.body.primeSubscribed })
      .where(eq(TB_customer.id, req.body.id))
      .returning();
    success(res, result, 'Subscribed to prime');
  })
);
