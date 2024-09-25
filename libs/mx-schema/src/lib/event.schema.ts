import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const TB_event = pgTable('event', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  active: boolean('active'),
  eventDate: text('eventDate'),
  eventTime: text('eventTime'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(() => new Date()),
});

export type TEvent = typeof TB_event.$inferSelect;
export const Z_Event = createInsertSchema(TB_event);
