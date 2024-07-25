import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { TB_organisation } from '../organisation/organisation.schema';

export const TB_bodyPart = pgTable('bodyPart', {
  id: serial('id').primaryKey(),
  organisationID: integer('organisationID')
    .notNull()
    .references(() => TB_organisation.id),
  name: text('name').notNull(),
  description: text('description'),
});

export const Z_bodyPart = createSelectSchema(TB_bodyPart);
export type TBodyPart = typeof TB_bodyPart.$inferSelect;
