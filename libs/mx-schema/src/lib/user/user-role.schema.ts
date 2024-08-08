import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { TB_role } from '../role.schema';
import { TB_user } from './user.schema';

export const TB_userRole = pgTable('userRole', {
  id: serial('id').primaryKey(),
  roleID: integer('roleID')
    .notNull()
    .references(() => TB_role.id),
  userID: integer('userID')
    .notNull()
    .references(() => TB_user.id),
});

export const Z_userRole_insert = createInsertSchema(TB_userRole);
export const Z_userRole = createSelectSchema(TB_userRole);
export type TUserRole = typeof TB_userRole.$inferSelect;
