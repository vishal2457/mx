import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const TB_permissionType = pgTable('permission', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const Z_permissionType = createSelectSchema(TB_permissionType);
export const Z_permissionType_insert = createInsertSchema(TB_permissionType);
export type TPermission = z.infer<typeof Z_permissionType>;
