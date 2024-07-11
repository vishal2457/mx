import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { TB_organisation } from '../../../../../../libs/mx-schema/src';
import { createInsertSchema } from 'drizzle-zod';
import { organisationService } from './organisation.service';
import { userService } from '../user/user.service';
import { hashPassword } from '../../../shared/password-hash';

export default Router().post(
  '/create',
  validate({ body: createInsertSchema(TB_organisation) }),
  async (req, res) => {
    const [org] = await organisationService.createOrganisation(req.body);
    const createUser = userService.createUser({
      email: org.email,
      password: hashPassword('123'),
      organisationID: org.id,
    });

    success(res, org, 'success');
  },
);
