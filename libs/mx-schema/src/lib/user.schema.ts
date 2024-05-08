import {
  pgTable,
  text,
  integer,
  uniqueIndex,
  boolean,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const TB_user = pgTable(
  'adminUsers',
  {
    id: integer('id').primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    password: text('password').notNull(),
    active: boolean('active').default(false),
  },
  (adminUser) => ({
    rmailIdx: uniqueIndex('rmailIdx').on(adminUser.email),
  })
);

export const Z_user_insert = createInsertSchema(TB_user);
export const Z_user = createSelectSchema(TB_user);
