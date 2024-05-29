import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import {
  TB_customerFcm,
  TB_notification,
  Z_notification_insert,
} from '../../../../../../libs/mx-schema/src';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { FirebaseNotificationQueue } from '../../../shared/queue/firebase-notification/firebase-notification.queue';

export default Router().post(
  '/create',
  validate({ body: Z_notification_insert }),
  async (req, res) => {
    const customerTokens = await db.select().from(TB_customerFcm);
    if (!customerTokens) {
      return;
    }
    const tokens = customerTokens.map((c) => c.token);
    const processNotification = new FirebaseNotificationQueue();
    await processNotification.sendNotification(
      'firebase-notification-from-admin',
      { tokens: tokens, payload: req.body }
    );
    const results = await db
      .insert(TB_notification)
      .values({ title: req.body.title, body: req.body.body })
      .returning();
    success(res, results, 'success');
  }
);
