import { Router } from 'express';
import ah from '../../../shared/async-handler.util';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { union } from 'zod';
import { db } from '../../../db/db';
import {
  TB_customer,
  TB_customer_offer,
  TB_customerFcm,
  TB_offer,
  Z_customer_insert,
  Z_customerFcm_insert,
} from '../../../../../../libs/mx-schema/src';
import { success } from '../../../shared/api-response/response-handler';
import { getCustomerWithOffers } from '../../../db/prepared-statements/customer/customer-offers';

const requestBodyValidation = union([
  Z_customer_insert.pick({ device: true, deviceID: true }),
  Z_customerFcm_insert.pick({ token: true }),
]);

const formatRows = (
  rows: {
    customer: typeof TB_customer.$inferSelect;
    customerOffer: typeof TB_customer_offer.$inferSelect;
    offer: typeof TB_offer.$inferSelect;
  }[]
) => {
  return {
    ...rows[0].customer,
    offer: rows[0].offer,
    offerDetails: rows[0].customerOffer,
  };
};

export default Router().post(
  '/create',
  validate({
    body: requestBodyValidation,
  }),
  ah(async (req, res) => {
    const rows = await getCustomerWithOffers.execute({
      deviceID: req.body.deviceID,
    });

    if (rows.length) {
      return success(
        res,
        formatRows(rows),
        `Customer exist with device id ${req.body.deviceID}`
      );
    }

    const newCustomer = await db.transaction(async (tx) => {
      //add new customer
      const [customer] = await tx
        .insert(TB_customer)
        .values({ deviceID: req.body.deviceID, device: req.body.device })
        .returning();

      // add fcm token
      await tx
        .insert(TB_customerFcm)
        .values({ token: req.body.token, customerID: customer.id });
      return customer;
    });

    success(res, newCustomer, 'success');
  })
);
