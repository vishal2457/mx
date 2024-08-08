import { index, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { TB_role } from '../role.schema';

export const TB_rolePermission = pgTable(
  'rolePermission',
  {
    id: serial('id').primaryKey(),
    permission: text('permission').notNull(),
    menuName: text('menuName').notNull(),
    roleID: integer('roleID')
      .notNull()
      .references(() => TB_role.id),
  },
  (rolePermission) => ({
    roleIdx: index('roleIdx').on(rolePermission.roleID),
  }),
);

export const Z_rolePermission = createSelectSchema(TB_rolePermission);
export type TRolePermission = z.infer<typeof Z_rolePermission>;
