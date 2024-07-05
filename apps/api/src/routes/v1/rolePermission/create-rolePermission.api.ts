import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_rolePermission } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { rolePermissionService } from './rolePermission.service';

export default Router().post(
  '/create',
  validate({ body: createInsertSchema(TB_rolePermission) }),
  async (req, res) => {
    const result = await rolePermissionService.createRolePermission(req.body);
    success(res, result, 'success');
  }
);
