import { pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const MATCH_STATUS = [
  'completed',
  'in-progress',
  'waiting',
  'done',
] as const;
export const statusEnum = pgEnum('status', MATCH_STATUS);

export const TB_match = pgTable('match', {
  id: serial('id').primaryKey(),
  gameSlug: text('gameSlug').notNull(),
  teamOne: text('teamOne').notNull(),
  teamOneLogo: text('teamOneLogo').notNull(),
  teamTwo: text('teamTwo').notNull(),
  teamTwoLogo: text('teamTwoLogo').notNull(),
  teamTwoSlug: text('teamTwoSlug').notNull(),
  teamOneSlug: text('teamOneSlug').notNull(),
  venue: text('venue').notNull(),
  league: text('league').notNull(),
  h2hTeam: text('h2hTeam').notNull(),
  h2hTeamImage: text('h2hTeamImage').notNull(),
  premiumTeamImage: text('premiumTeamImage').notNull(),
  startDate: text('startDate').notNull(),
  startTime: text('startTime').notNull(),
  description: text('description').notNull(),
  format: text('format').notNull(),
  status: statusEnum('status').default('waiting'),
});

export const Z_match_insert = createInsertSchema(TB_match);
export const Z_match = createSelectSchema(TB_match);
export type TMatch = z.infer<typeof Z_match>;
