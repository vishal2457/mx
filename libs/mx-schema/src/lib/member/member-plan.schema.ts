import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core';
import { TB_member } from './member.schema';
import { TB_plan } from '../plan.schema';
import { createSelectSchema } from 'drizzle-zod';

export const TB_memberPlan = pgTable('memberPlan', {
  id: serial('id').primaryKey(),
  memberID: integer('memberID')
    .notNull()
    .references(() => TB_member.id),
  planID: integer('planID')
    .notNull()
    .references(() => TB_plan.id),
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  paid: boolean('paid').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(() => new Date()),
});

export const Z_memberPlan = createSelectSchema(TB_memberPlan);
export type TMemberPlan = typeof TB_memberPlan.$inferSelect;
