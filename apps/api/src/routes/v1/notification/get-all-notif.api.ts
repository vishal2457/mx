import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import ah from '../../../shared/async-handler.util';
import { notificationService } from './notification.service';

export default Router().get(
  '/list',
  ah(async (req, res) => {
    const notifications = await notificationService.getAllNotification(
      req.query
    );
    const totalRows = await notificationService.getCount();

    success(res, { rows: notifications, count: totalRows }, 'success');
  })
);
