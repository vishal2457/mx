import { sql } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const OFFER_PERIOD = ['1', '15', '30'] as const;

export const periodEnum = pgEnum('period', OFFER_PERIOD);

export const TB_offer = pgTable('offer', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  period: periodEnum('period').default('1'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const Z_offer = createSelectSchema(TB_offer);
export const Z_offer_insert = createInsertSchema(TB_offer);
export type TOffer = z.infer<typeof Z_offer>;
