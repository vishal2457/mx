import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { TB_organisation } from './organisation/organisation.schema';

export const TB_role = pgTable('role', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  organisationID: integer('organisationID')
    .notNull()
    .references(() => TB_organisation.id),
});

export const Z_role_insert = createInsertSchema(TB_role);
export const Z_role = createSelectSchema(TB_role);
export type TRole = z.infer<typeof Z_role>;
