import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { TB_member } from './member.schema';

export const TB_memberPlan = pgTable('memberPlan', {
  id: serial('id').primaryKey(),
  memberID: integer('memberID')
    .notNull()
    .references(() => TB_member.id),
  planName: text('planName').notNull(),
  amount: integer('amount').notNull(),
  periodInMonths: integer('periodInMonths').notNull(),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  paid: boolean('paid').default(true),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(() => new Date()),
});

export const Z_memberPlan = createSelectSchema(TB_memberPlan);
export type TMemberPlan = typeof TB_memberPlan.$inferSelect;
