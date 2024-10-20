import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const TB_LandingPageLead = pgTable('landingPageLead', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  note: text('note'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export type TLandingPageLeads = typeof TB_LandingPageLead.$inferSelect;
