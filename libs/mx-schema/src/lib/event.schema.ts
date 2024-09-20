import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const TB_event = pgTable('event', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  active: boolean('active'),
});

export type TEvent = typeof TB_event.$inferSelect;
