import { Router } from 'express';
import {
  v_param_id,
  Z_role_insert,
} from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import ah from '../../../../shared/async-handler.util';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { roleService } from '../role.service';

export default Router().post(
  '/update/:id',
  validate({
    body: Z_role_insert,
    params: v_param_id,
  }),
  ah(async (req, res) => {
    const result = await roleService.updateRole(req.body, req.params.id);
    success(res, result, 'updated');
  })
);
