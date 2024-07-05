import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_permission } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { permissionService } from './permission.service';

export default Router().post(
  '/create',
  validate({ body: createInsertSchema(TB_permission) }),
  async (req, res) => {
    const result = await permissionService.createPermission(req.body);
    success(res, result, 'success');
  }
);
