import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { TB_member } from './member.schema';
import { createSelectSchema } from 'drizzle-zod';

export const TB_memberMetricHistory = pgTable('memberMetricHistory', {
  id: serial('id').primaryKey(),
  memberID: integer('memberID')
    .notNull()
    .references(() => TB_member.id),
  weight: integer('weight').notNull(),
  age: integer('age').notNull(),
  height: integer('height').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const Z_memberMetricHistory = createSelectSchema(TB_memberMetricHistory);
export type TMemberMetricHistory = typeof TB_memberMetricHistory.$inferSelect;
