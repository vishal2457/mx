import { createInsertSchema } from 'drizzle-zod';
import { Router } from 'express';
import {
  TB_role,
  TB_rolePermission,
  v_param_id,
} from '../../../../../../../libs/mx-schema/src';
import { db } from '../../../../db/db';
import { success } from '../../../../shared/api-response/response-handler';
import ah from '../../../../shared/async-handler.util';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { roleService } from '../role.service';

const bodyValidations = createInsertSchema(TB_role)
  .omit({ organisationID: true })
  .extend({
    permissions: createInsertSchema(TB_rolePermission).array(),
  });

export default Router().put(
  '/update/:id',
  validate({
    body: bodyValidations,
    params: v_param_id,
  }),
  ah(async (req, res) => {
    db.transaction(async (tx) => {
      const result = await roleService.updateRole(req.body, req.params.id, tx);
      await roleService.deleteRolePermission(req.params.id, tx);
      await roleService.createRolePermission(req.body.permissions);
      success(res, result, 'updated');
    });
  }),
);
