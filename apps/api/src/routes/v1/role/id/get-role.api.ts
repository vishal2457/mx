import { Router } from 'express';
import { v_param_id } from '../../../../../../../libs/mx-schema/src';
import { success } from '../../../../shared/api-response/response-handler';
import ah from '../../../../shared/async-handler.util';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { roleService } from '../role.service';

export default Router().get(
  '/detail/:id',
  validate({ params: v_param_id }),
  ah(async (req, res) => {
    const result = await roleService.getByID(req.params.id);
    success(res, result, 'Role Details');
  })
);
