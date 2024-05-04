import { Router } from 'express';
import ah from '../../../../shared/async-handler.util';
import { success } from '../../../../shared/api-response/response-handler';
import { db } from '../../../../db/db';
import { eq } from 'drizzle-orm';
import { validate } from '../../../../shared/middlewares/validation.middleware';

export default Router().post(
  '/update/:id',
  ah(async (req, res) => {
    success(res, '', 'updated');
  })
);
