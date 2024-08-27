import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';

export const TB_organisation = pgTable(
  'organisation',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('emailVerified').default(true),
    active: boolean('active').default(true),
    mobile: text('mobile'),
    logo: text('logo').notNull().default(''),
    panelName: text('panelName').notNull().default('Admin'),
    darkMode: boolean('darkMode').default(true),
    theme: text('theme').default('default'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').$onUpdate(() => new Date()),
  },
  (org) => ({
    orgEmailIdx: uniqueIndex('orgEmailIdx').on(org.email),
  }),
);

export const Z_organisation = createSelectSchema(TB_organisation);
export type TOrganisation = typeof TB_organisation.$inferSelect;
