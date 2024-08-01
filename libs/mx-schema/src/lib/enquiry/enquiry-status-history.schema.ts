import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { TB_user } from '../user/user.schema';
import { statusEnum, TB_enquiry } from './enquiry.schema';

export const TB_enquiryStatusHistory = pgTable('enquiryStatusHistory', {
  id: serial('id').primaryKey(),
  status: statusEnum('status').notNull(),
  userID: integer('userID')
    .notNull()
    .references(() => TB_user.id),
  enquiryID: integer('enquiryID')
    .notNull()
    .references(() => TB_enquiry.id),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const Z_enquiryStatusHistory = createSelectSchema(
  TB_enquiryStatusHistory,
);
export type TEnquiryStatusHistory = typeof TB_enquiryStatusHistory.$inferSelect;
