import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { TB_offer } from '../offer.schema';
import { TB_customer } from './customer.schema';

export const TB_customer_offer = pgTable('customerOffer', {
  id: serial('id').primaryKey(),
  customerID: integer('customerID')
    .references(() => TB_customer.id)
    .notNull(),
  offerID: integer('offerID')
    .references(() => TB_offer.id)
    .notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});
