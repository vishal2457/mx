import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const TB_userRole = pgTable('userRole', {
  id: serial('id').primaryKey(),
  roleID: integer('roleID').notNull(),
  userID: integer('userID').notNull(),
});

export const Z_userRole_insert = createInsertSchema(TB_userRole);
export const Z_userRole = createSelectSchema(TB_userRole);
export type TUSerRole = z.infer<typeof Z_userRole>;
