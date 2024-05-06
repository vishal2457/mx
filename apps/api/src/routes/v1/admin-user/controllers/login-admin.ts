import { Router } from 'express';
import ah from '../../../../shared/async-handler.util';
import {
  success,
  unauthorized,
} from '../../../../shared/api-response/response-handler';
import { db } from '../../../../db/db';
import { eq } from 'drizzle-orm';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { TB_adminUser } from '../../../../db/schema/admin-user.schema';
import { checkPassword } from '../../../../shared/password-hash';
import { generateToken } from '../../../../shared/jwt/token-utils';

export default Router().post(
  '/update/:id',
  ah(async (req, res) => {
    const admin = await db.query.TB_adminUser.findFirst({
      where: eq(TB_adminUser.email, req.body.email),
    });

    if (!admin) {
      return unauthorized(res, 'Incorrect credentials');
    }

    if (!checkPassword(req.body.password, admin.password)) {
      return unauthorized(res, 'Incorrect credentials');
    }

    const token = generateToken({ email: admin.email, id: admin.id });
    success(res, { token }, 'login success');
  })
);
