import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import handler from '../../../shared/async-handler.util';
// import Stripe from 'stripe';
import Razorpay from 'razorpay';
import { APP_SETTINGS } from '../../../shared/app-settings';

// const stripe = new Stripe(APP_SETTINGS.PAYMENT_API);

// stripe
// export default Router().post(
//   '/create',
//   handler(async (req, res) => {
//     const { email, paymentMethodId } = req.body;

//     const customer = await stripe.customers.create({
//       email,
//       payment_method: paymentMethodId,
//       invoice_settings: {
//         default_payment_method: paymentMethodId,
//       },
//     });

//     // Create a subscription
//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [{ price: 'price_1PJKE6SAYpZ7f0agkdQDdtTh' }],
//       expand: ['latest_invoice.payment_intent'],
//     });

//     success(
//       res,
//       {
//         subscriptionID: subscription.id,
//         clientSecret:
//           subscription['latest_invoice']['payment_intent']['client_secret'],
//       },
//       'Payment initiated'
//     );
//   })
// );

const razorpay = new Razorpay({
  key_id: APP_SETTINGS.RAZORPAY_KEY,
  key_secret: APP_SETTINGS.RAZORPAY_SECRET,
});

export default Router().post(
  '/create',
  handler(async (req, res) => {
    const { amount, currency, receipt } = req.body;

    const order = await razorpay.orders.create({ amount, currency, receipt });

    success(res, order, 'Razorpay order created');
  })
);
