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
import { APP_SETTINGS } from '../../../shared/app-settings';

export default Router().post(
  '/login',
  validate({ body: Z_member.pick({ email: true, passcode: true }) }),
  async (req, res) => {
    const [result] = await memberService.getByEmail(req.body.email);
    if (!result) {
      return unauthorized(res, 'Invalid credentials');
    }

    if (!checkPassword(req.body.passcode, result.member.passcode)) {
      return unauthorized(res, 'Invalid credentials');
    }
    delete result.member.passcode;
    const payload = {
      id: result.member.id,
      email: result.member.email,
      organisationID: result.member.organisationID,
      workoutTemplateID: result.member.workoutTemplateID,
    };
    const token = generateToken(payload);

    success(
      res,
      {
        token,
        member: { ...result.member, trainer: result.user },
        enableAI: APP_SETTINGS.ENABLE_AI_TAB,
      },
      'success',
    );
  },
);
