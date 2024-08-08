import { Router } from 'express';
import { Z_user_insert } from '../../../../../../libs/mx-schema/src';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { hashPassword } from '../../../shared/password-hash';
import { userService } from './user.service';
import { secure } from '../../../shared/jwt/jwt-auth.middleware';
import { db } from '../../../db/db';

export default Router().post(
  '/create',
  secure,
  validate({
    body: Z_user_insert.omit({ active: true, id: true, organisationID: true }),
  }),
  async (req, res) => {
    db.transaction(async (tx) => {
      const [result] = await userService.createUser(
        {
          ...req.body,
          active: true,
          password: hashPassword(req.body.password),
          organisationID: req.user.organisationID,
        },
        tx,
      );
      const userRolePayload = req.body.roles.map((i) => {
        return { roleID: i, userID: result.id };
      });
      await userService.createBulkUserRole(userRolePayload, tx);
      success(res, result, 'updated');
    });
  },
);
