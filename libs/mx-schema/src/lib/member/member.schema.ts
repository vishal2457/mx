import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { TB_organisation } from '../organisation/organisation.schema';
import { createSelectSchema } from 'drizzle-zod';
import { qs } from '../_zod-utils/parser';
import { TB_plan } from '../plan.schema';

export const GENDERS = ['male', 'female'] as const;

export const genderEnum = pgEnum('gender', GENDERS);

export const TB_member = pgTable('member', {
  id: serial('id').primaryKey(),
  organisationID: integer('organisationID')
    .notNull()
    .references(() => TB_organisation.id),
  planID: integer('planID')
    .notNull()
    .references(() => TB_plan.id),
  name: text('name').notNull(),
  dob: text('dob').notNull(),
  address: text('address').notNull(),
  mobile: text('mobile').notNull(),
  email: text('email').notNull(),
  height: text('height').notNull(),
  weight: text('weight').notNull(),
  emergencyContact: text('emergencyContact').notNull(),
  gender: genderEnum('gender').default('female'),
  userID: integer('userID').notNull(),
  joinDate: timestamp('joinDate').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(() => new Date()),
});

export const Z_member = createSelectSchema(TB_member, {
  id: (schema) => schema.id.describe(qs({ skipField: true })),
  createdAt: (schema) => schema.createdAt.describe(qs({ skipField: true })),
  updatedAt: (schema) => schema.updatedAt.describe(qs({ skipField: true })),
  organisationID: (schema) =>
    schema.organisationID.describe(qs({ skipField: true })),
});
export type TMember = typeof TB_member.$inferSelect;
