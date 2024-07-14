import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { TB_member } from './member.schema';
import { createSelectSchema } from 'drizzle-zod';

export const TB_memberAttendance = pgTable('memberAttendance', {
  id: serial('id').primaryKey(),
  memberID: integer('memberID')
    .notNull()
    .references(() => TB_member.id),
  dateAndTime: timestamp('dateAndTime').defaultNow(),
});

export const Z_memberAttendance = createSelectSchema(TB_memberAttendance);
export const TMemberAttendance = typeof TB_memberAttendance.$inferSelect;
