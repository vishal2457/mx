import { Router } from 'express';
import {
  TB_customerFcm,
  TB_notification,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { other, success } from '../../../shared/api-response/response-handler';
import { ImageUpload } from '../../../shared/middlewares/multer.middleware';
import { firebaseNotificationQueue } from '../../../shared/queue/firebase-notification/firebase-notification.queue';

export default Router().post(
  '/create',
  ImageUpload.single('notificationImage'),
  // validate({ body: Z_notification_insert }),
  async (req, res) => {
    const customerTokens = await db.select().from(TB_customerFcm);
    if (!customerTokens.length) {
      return other(res, 'No Customer tokens found');
    }
    const tokens = customerTokens.map((c) => c.token);
    const payload = {
      title: req.body.title,
      body: req.body.body,
    };
    if (req?.file?.filename) {
      payload['image'] = req.file.filename;
    }

    await firebaseNotificationQueue.sendNotification(
      'firebase-notification-from-admin',
      { tokens: tokens, payload },
    );
    const results = await db
      .insert(TB_notification)
      .values(payload)
      .returning();
    success(res, results, 'success');
  },
);
