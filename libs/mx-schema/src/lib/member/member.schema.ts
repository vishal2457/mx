import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { qs } from '../_zod-utils/parser';
import { TB_organisation } from '../organisation/organisation.schema';
import { TB_workoutTemplate } from '../workout/workout-template.schema';

export const GENDERS = ['Male', 'Female'] as const;

export const genderEnum = pgEnum('gender', GENDERS);

export const TB_member = pgTable('member', {
  id: serial('id').primaryKey(),
  organisationID: integer('organisationID')
    .notNull()
    .references(() => TB_organisation.id),
  name: text('name').notNull(),
  email: text('email').notNull(),
  userID: integer('userID').notNull(),
  joinDate: varchar('joinDate').notNull(),
  quickAdd: boolean('quickAdd').default(false),
  passcode: varchar('passcode', { length: 255 }).notNull(),
  age: integer('age'),
  address: text('address'),
  mobile: text('mobile'),
  height: integer('height'),
  weight: integer('weight'),
  emergencyContact: text('emergencyContact'),
  gender: genderEnum('gender').default('Female'),
  profilePic: text('profilePic'),
  active: boolean('active').default(true),
  workoutTemplateID: integer('workoutTemplateID').references(
    () => TB_workoutTemplate.id,
  ),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').$onUpdate(() => new Date()),
});

export const Z_member = createSelectSchema(TB_member, {
  id: (schema) => schema.id.describe(qs({ skipField: true })),
  createdAt: (schema) => schema.createdAt.describe(qs({ skipField: true })),
  updatedAt: (schema) => schema.updatedAt.describe(qs({ skipField: true })),
  organisationID: (schema) =>
    schema.organisationID.describe(qs({ skipField: true })),
  joinDate: z.string().date(),
});
export type TMember = typeof TB_member.$inferSelect;
