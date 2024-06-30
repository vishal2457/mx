import { Router } from 'express';
import { Z_user_insert } from '../../../../../../libs/mx-schema/src';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { hashPassword } from '../../../shared/password-hash';
import { userService } from './user.service';

export default Router().post(
  '/create',
  validate({ body: Z_user_insert.omit({ active: true, id: true }) }),
  async (req, res) => {
    const result = await userService.createUser({
      ...req.body,
      active: true,
      password: hashPassword(req.body.password),
    });
    success(res, result, 'success');
  }
);
