import { sql } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const TB_test = pgTable('test', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const Z_test_insert = createInsertSchema(TB_test);
export const Z_test = createSelectSchema(TB_test);
export type TTest = z.infer<typeof Z_test>;
