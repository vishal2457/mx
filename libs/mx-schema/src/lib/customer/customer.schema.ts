import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const TB_customer = pgTable('customer', {
  id: serial('id').primaryKey(),
  deviceID: text('deviceID').notNull(),
  device: text('device').default('ios'),
});

export const Z_customer_insert = createInsertSchema(TB_customer);
export const Z_customer = createSelectSchema(TB_customer);
