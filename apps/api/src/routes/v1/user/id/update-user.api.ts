import { createInsertSchema } from 'drizzle-zod';
import { Router } from 'express';
import { z } from 'zod';
import { TB_user, v_param_id } from '../../../../../../../libs/mx-schema/src';
import { db } from '../../../../db/db';
import { success } from '../../../../shared/api-response/response-handler';
import ah from '../../../../shared/async-handler.util';
import { validate } from '../../../../shared/middlewares/validation.middleware';
import { hashPassword } from '../../../../shared/password-hash';
import { userService } from '../user.service';

const bodyValidation = createInsertSchema(TB_user)
  .omit({ organisationID: true, password: true })
  .extend({ roles: z.number().array() });

export default Router().put(
  '/update/:id',
  validate({
    body: bodyValidation,
    params: v_param_id,
  }),
  ah(async (req, res) => {
    db.transaction(async (tx) => {
      if (req.body.password) {
        req.body.password = hashPassword(req.body.password);
      } else {
        delete req.body.password;
      }

      const result = await userService.updateUserByID(
        req.body,
        req.params.id,
        tx,
      );
      await userService.deleteUserRoleByUserID(req.params.id, tx);
      const userRolePayload = req.body.roles.map((i) => {
        return { roleID: i, userID: req.params.id };
      });
      await userService.createBulkUserRole(userRolePayload, tx);
      success(res, result, 'updated');
    });
  }),
);
