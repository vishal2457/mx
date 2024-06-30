import { Router } from 'express';
import {
  v_param_id,
  Z_user_insert,
} from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import ah from '../../../../shared/async-handler.util';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { hashPassword } from '../../../../shared/password-hash';
import { userService } from '../user.service';

export default Router().put(
  '/update/:id',
  validate({
    body: Z_user_insert.omit({ id: true }),
    params: v_param_id,
  }),
  ah(async (req, res) => {
    if (req.body.password) {
      req.body.password = hashPassword(req.body.password);
    }

    const result = await userService.updateUserByID(req.body, req.params.id);

    success(res, result, 'updated');
  })
);
