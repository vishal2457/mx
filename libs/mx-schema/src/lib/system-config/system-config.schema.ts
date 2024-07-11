import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { qs } from "../_zod-utils/parser";

export const TB_systemConfig = pgTable('systemConfig', {
  id: serial('id').primaryKey(),
  logo: text('logo').notNull(),
  panelName: text('panelName').notNull(),
  darkMode: boolean('darkMode').default(true)
})

export const Z_systemConfig = createSelectSchema(TB_systemConfig, {
  id: (schema) => schema.id.describe(qs({skipField: true})),
  logo: (schema) => schema.id.describe(qs({type: 'file'})),
  darkMode: schema => schema.darkMode.describe(qs({type: 'checkbox'}))
});
export type TSystemConfig = typeof TB_systemConfig.$inferSelect;
