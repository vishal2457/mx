import { index, integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { TB_permission } from './permission.schema';
import { TB_role } from '../role.schema';

export const TB_rolePermission = pgTable(
  'rolePermission',
  {
    id: serial('id').primaryKey(),
    permissionID: integer('permissionID').notNull().references(() => TB_permission.id),
    roleID: integer('roleID').notNull().references(() => TB_role.id),
  },
  (rolePermission) => ({
    roleIdx: index('roleIdx').on(rolePermission.roleID),
    permissionIdx: index('permissionIdx').on(rolePermission.permissionID),
  })
);

export const Z_rolePermission = createSelectSchema(TB_rolePermission);
export const Z_rolePermission_insert = createInsertSchema(TB_rolePermission);
export type TRolePermission = z.infer<typeof Z_rolePermission>;
