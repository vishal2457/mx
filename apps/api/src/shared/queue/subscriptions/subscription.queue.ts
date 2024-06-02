import { OFFER_PERIOD } from '../../../../../../libs/mx-schema/src';
import { GLOBAL_CONSTANTS } from '../../global-constants';
import { BaseQueue } from '../base-queue';
import { subscriptionWorker } from './subscription.worker';
import { add } from 'date-fns';

export type CancelSubscriptionData = {
  customerOfferId: number;
  subscriptionStartDate: Date;
  period: (typeof OFFER_PERIOD)[number];
};

export class SubscriptionQueue extends BaseQueue {
  constructor() {
    super(
      GLOBAL_CONSTANTS.QUEUE_NAMES.subscriptionNotification,
      subscriptionWorker
    );
  }

  cancelUserSubscription(name: string, data: CancelSubscriptionData) {
    const newDate = add(data.subscriptionStartDate, {
      hours: parseInt(data.period) * 24,
    });
    const delay = newDate.getTime() - Date.now();
    return this.add(name, data, { delay });
  }
}

export const subscriptionQueue = new SubscriptionQueue();
