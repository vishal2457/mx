import { Router } from 'express';
import {
  success,
  unauthorized,
} from '../../../shared/api-response/response-handler';
import { memberService } from './member.service';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { Z_member } from '../../../../../../libs/mx-schema/src';
import { checkPassword } from '../../../shared/password-hash';
import { generateToken } from '../../../shared/jwt/token-utils';

export default Router().post(
  '/login',
  validate({ body: Z_member.pick({ email: true, passcode: true }) }),
  async (req, res) => {
    const member = await memberService.getByEmail(req.body.email);
    if (!member) {
      return unauthorized(res, 'Invalid credentials');
    }

    if (!checkPassword(req.body.passcode, member.passcode)) {
      return unauthorized(res, 'Invalid credentials');
    }
    const payload = {
      id: member.id,
      email: member.email,
      organisationID: member.organisationID,
    };
    const token = generateToken(payload);

    success(res, { token, member: payload }, 'success');
  },
);
