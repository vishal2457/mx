import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { TB_user } from "./user.schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const TB_userBookmark = pgTable('userBookmark', {
  id: serial('id').primaryKey(),
  link: text('link').notNull(),
  userID: integer('userID').references(() => TB_user.id).notNull()
})

export const Z_userBookmark = createSelectSchema(TB_userBookmark);
export type TUserBookmark = z.infer<typeof Z_userBookmark>;
