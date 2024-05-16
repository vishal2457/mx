import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const TB_notification = pgTable('notifications', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
});
