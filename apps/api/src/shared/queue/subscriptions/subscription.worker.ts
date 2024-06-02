import { Worker } from 'bullmq';
import { GLOBAL_CONSTANTS } from '../../global-constants';
import { queueConnection } from '../queue-connection';
import { db } from '../../../db/db';
import { TB_customer_offer } from '../../../../../../libs/mx-schema/src';
import { eq } from 'drizzle-orm';

export const subscriptionWorker = new Worker(
  GLOBAL_CONSTANTS.QUEUE_NAMES.subscriptionNotification,
  async (job) => {
    try {
      await db
        .update(TB_customer_offer)
        .set({ active: false })
        .where(eq(TB_customer_offer.id, job.data.customerOfferId));
    } catch (error) {
      throw new Error(error);
    }
  },
  { connection: queueConnection }
);
