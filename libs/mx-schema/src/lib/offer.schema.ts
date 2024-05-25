import { integer, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const periodEnum = pgEnum('period', ['month', 'year']);

export const TB_offer = pgTable('offer', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  period: periodEnum('period').default('month'),
});

export const Z_offer = createSelectSchema(TB_offer);
export const Z_offer_insert = createInsertSchema(TB_offer);
export type TOffer = z.infer<typeof Z_offer>;
