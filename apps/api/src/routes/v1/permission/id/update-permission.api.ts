import { Router } from 'express';
import { success } from '../../../../shared/api-response/response-handler';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import {
  TB_permission,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { permissionService } from '../permission.service';


export default Router().put(
  '/update/:id',
  validate({
    body: createInsertSchema(TB_permission),
    params: v_param_id,
  }),
  async (req, res) => {
    const result = await permissionService.updatePermission(req.body, req.params.id);
    success(res, result, 'updated');
  }
);
