import {
  pgTable,
  text,
  integer,
  uniqueIndex,
  boolean,
  serial,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { TMenu } from './menu.schema';

export const TB_user = pgTable(
  'user',
  {
    id: serial('id').primaryKey(),
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
export type R_userLogin = { token: string; menu: TMenu[] };
