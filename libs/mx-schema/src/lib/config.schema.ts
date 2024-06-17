import { boolean, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const TB_config = pgTable('config', {
  id: serial('id').primaryKey(),
  adBannerID: text('adBannerID').notNull(),
  adRewardID: text('adRewardID').notNull(),
  privacyPolicy: text('privacyPolicy').notNull(),
  telegramLink: text('telegramLink').notNull(),
  aboutUs: text('aboutUs').notNull(),
  ads: boolean('ads').default(true).notNull(),
});

export const Z_config = createSelectSchema(TB_config);
export const Z_config_insert = createInsertSchema(TB_config);
export type TConfig = z.infer<typeof Z_config>;
export type TConfigForm = Omit<TConfig, 'id'>;
