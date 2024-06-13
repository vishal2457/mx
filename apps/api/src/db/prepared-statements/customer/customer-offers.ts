import { and, eq, sql } from 'drizzle-orm';
import {
  TB_customer,
  TB_customer_offer,
  TB_offer,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../db';

export const getCustomerWithOffers = db
  .select()
  .from(TB_customer)
  .leftJoin(TB_customer_offer, eq(TB_customer.id, TB_customer_offer.customerID))
  .leftJoin(
    TB_offer,
    and(
      eq(TB_customer_offer.offerID, TB_offer.id),
      eq(TB_customer_offer.active, true)
    )
  )
  .where(and(eq(TB_customer.deviceID, sql.placeholder('deviceID'))));
