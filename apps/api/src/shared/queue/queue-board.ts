import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { firebaseNotificationQueue } from './firebase-notification/firebase-notification.queue';
import { processEmailQueue } from './process-email/process-email.queue';

export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [
    new BullAdapter(firebaseNotificationQueue.queue, { allowRetries: true }),
    new BullAdapter(processEmailQueue.queue, { allowRetries: true }),
  ],
  serverAdapter: serverAdapter,
  options: {
    uiConfig: {
      boardTitle: 'MX Api Queue',
    },
  },
});
