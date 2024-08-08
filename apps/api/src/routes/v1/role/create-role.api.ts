import { Router } from 'express';
import { TB_role } from '../../../../../../libs/mx-schema/src';
import { success } from '../../../shared/api-response/response-handler';
import ah from '../../../shared/async-handler.util';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { roleService } from './role.service';
import { createInsertSchema } from 'drizzle-zod';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';

export default Router().post(
  '/create',
  secure,
  validate({
    body: createInsertSchema(TB_role).omit({ organisationID: true }),
  }),
  ah(async (req, res) => {
    const [result] = await roleService.createRole({
      ...req.body,
      organisationID: req.user.organisationID,
    });
    success(res, result, 'success');
  }),
);
