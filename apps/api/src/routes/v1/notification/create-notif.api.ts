import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import {
  TB_customerFcm,
  TB_notification,
  Z_notification_insert,
} from '../../../../../../libs/mx-schema/src';
import { sendFirebaseNotification } from '../../../shared/firebase/notification.fire';
import { validate } from '../../../shared/middlewares/validation.middleware';

export default Router().post(
  '/create',
  validate({ body: Z_notification_insert }),
  async (req, res) => {
    const customerTokens = await db.select().from(TB_customerFcm);
    if (!customerTokens) {
      return;
    }
    const tokens = customerTokens.map((c) => c.token);

    const n = await sendFirebaseNotification(tokens, { ...req.body });
    const results = await db
      .insert(TB_notification)
      .values({ title: req.body.title, body: req.body.body })
      .returning();
    success(res, results, 'success');
  }
);
