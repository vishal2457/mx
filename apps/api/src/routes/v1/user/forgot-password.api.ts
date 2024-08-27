import { Router } from 'express';
import { other, success } from '../../../shared/api-response/response-handler';
import { userService } from './user.service';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { Z_user } from '../../../../../../libs/mx-schema/src';
import { generatePassword } from '../../../../../../libs/helpers/src';
import { hashPassword } from '../../../shared/password-hash';
import { processEmailQueue } from '../../../shared/queue/process-email/process-email.queue';

export default Router().post(
  '/forgot-password',
  validate({ body: Z_user.pick({ email: true }) }),
  async (req, res) => {
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) {
      other(res, 'User not found');
    }
    const newPassword = generatePassword();
    await processEmailQueue.sendEmail({
      to: user.email,
      subject: 'New password',
      html: `Your new password is ${newPassword}`,
    });
    await userService.updateUserByID(
      { password: hashPassword(newPassword) },
      user.id,
    );

    success(res, null, 'success');
  },
);
