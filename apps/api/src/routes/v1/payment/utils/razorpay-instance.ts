import Razorpay from 'razorpay';
import { APP_SETTINGS } from '../../../../shared/app-settings';

export const razorpay = new Razorpay({
  key_id: APP_SETTINGS.RAZORPAY_KEY,
  key_secret: APP_SETTINGS.RAZORPAY_SECRET,
});
