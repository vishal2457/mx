import { Router } from 'express';
import { other, success } from '../../../shared/api-response/response-handler';
import { APP_SETTINGS } from '../../../shared/app-settings';
import ah from '../../../shared/async-handler.util';
import { db } from '../../../db/db';
import { TB_customer_offer } from '../../../../../../libs/mx-schema/src';
import { subscriptionQueue } from '../../../shared/queue/subscriptions/subscription.queue';

export default Router().post(
  '/verify-payment',
  ah(async (req, res) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order,
      offer,
      customer,
    } = req.body;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require('crypto');
    const generated_signature = crypto
      .createHmac('sha256', APP_SETTINGS.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      other(res, 'Payment verification failed');
    }

    const activatedOffer = await db
      .insert(TB_customer_offer)
      .values({
        customerID: customer.id,
        orderID: order.id,
        offerID: offer.id,
        paymentID: razorpay_payment_id,
      })
      .returning();

    await subscriptionQueue.cancelUserSubscription('cancel-user-sub', {
      customerOfferId: activatedOffer[0].id,
      subscriptionStartDate: activatedOffer[0].createdAt,
      period: offer.period,
    });

    success(res, { ...activatedOffer, offer }, 'Payment Verified');
  })
);
