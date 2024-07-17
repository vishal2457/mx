import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { TB_member } from './member.schema';
import { createSelectSchema } from 'drizzle-zod';

export const TB_memberWeightHistory = pgTable('memberWeightHistory', {
  id: serial('id').primaryKey(),
  memberID: integer('memberID')
    .notNull()
    .references(() => TB_member.id),
  weight: integer('weight').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const Z_memberWeightHistory = createSelectSchema(TB_memberWeightHistory);
export type TMemberWeightHistory = typeof TB_memberWeightHistory.$inferSelect;
