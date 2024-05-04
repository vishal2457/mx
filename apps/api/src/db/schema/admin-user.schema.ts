import {
  pgTable,
  text,
  integer,
  uniqueIndex,
  boolean,
} from 'drizzle-orm/pg-core';

export const TB_adminUser = pgTable(
  'adminUsers',
  {
    id: integer('id').primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    password: text('password').notNull(),
    active2: boolean('active2').default(false),
  },
  (adminUser) => ({
    nameIdx: uniqueIndex('nameIdx').on(adminUser.name),
  })
);
