import { Router } from 'express';
import { Z_role_insert } from '../../../../../../libs/mx-schema/src';
import { success } from '../../../shared/api-response/response-handler';
import ah from '../../../shared/async-handler.util';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { roleService } from './role.service';

export default Router().post(
  '/create',
  validate({ body: Z_role_insert }),
  ah(async (req, res) => {
    const result = await roleService.createRole(req.body);
    success(res, result, 'success');
  })
);
