import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { qs } from './_zod-utils/parser';

export const TB_plan = pgTable('plan', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  periodInMonths: integer('periodInMonths').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(() => new Date()),
});

export const Z_plan = createSelectSchema(TB_plan, {
  id: (schema) => schema.id.describe(qs({ skipField: true })),
  createdAt: (schema) => schema.createdAt.describe(qs({ skipField: true })),
  updatedAt: (schema) => schema.updatedAt.describe(qs({ skipField: true })),
});
export type TPlan = typeof TB_plan.$inferSelect;
