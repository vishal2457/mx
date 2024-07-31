import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { TB_user } from '../user/user.schema';
import { createSelectSchema } from 'drizzle-zod';
import { TB_organisation } from '../organisation/organisation.schema';

export const STATUS_ENUM = ['Open', 'Closed'] as const;
export const statusEnum = pgEnum('status', STATUS_ENUM);

export const GOAL = ['Muscle gain', 'Weight Loss', 'Stay fit'] as const;
export const goalEnum = pgEnum('goal', GOAL);

export const TB_enquiry = pgTable('enquiry', {
  id: serial('id').primaryKey(),
  organisationID: integer('organisationID')
    .notNull()
    .references(() => TB_organisation.id),
  customerName: text('customerName').notNull(),
  mobile: varchar('mobile', { length: 10 }).notNull(),
  email: text('email'),
  goal: goalEnum('goal').default('Stay fit'),
  status: statusEnum('status').default('Open'),
  userID: integer('userID').references(() => TB_user.id),
  periodInM: integer('periodInM').notNull().default(6),
  terms: text('terms'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(() => new Date()),
});

export const Z_enquiry = createSelectSchema(TB_enquiry);
export type TEnquiry = typeof TB_enquiry.$inferSelect;
