import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';

export const TB_bodyPart = pgTable('bodyPart', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

export const Z_bodyPart = createSelectSchema(TB_bodyPart);
export type TBodyPart = typeof TB_bodyPart.$inferSelect;
