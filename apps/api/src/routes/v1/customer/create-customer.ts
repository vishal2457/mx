import { Router } from 'express';
import ah from '../../../shared/async-handler.util';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { union } from 'zod';
import { db } from '../../../db/db';
import {
  TB_customer,
  TB_customerFcm,
  Z_customer_insert,
  Z_customerFcm_insert,
} from '../../../../../../libs/mx-schema/src';
import { success } from '../../../shared/api-response/response-handler';

const requestBodyValidation = union([
  Z_customer_insert.pick({ device: true, deviceID: true }),
  Z_customerFcm_insert.pick({ token: true }),
]);

export default Router().post(
  '/create',
  validate({
    body: requestBodyValidation,
  }),
  ah(async (req, res) => {
    const newCustomer = await db.transaction(async (tx) => {
      //add new customer
      const result = await tx
        .insert(TB_customer)
        .values({ deviceID: req.body.deviceID, device: req.body.device })
        .returning();

      // add fcm token
      await tx
        .insert(TB_customerFcm)
        .values({ token: req.body.token, customerID: result[0].id });
      return result;
    });
    success(res, newCustomer, 'success');
  })
);
