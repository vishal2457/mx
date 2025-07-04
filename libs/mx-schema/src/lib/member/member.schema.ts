import {
  boolean,
  integer,
  numeric,
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
import {
  TB_workoutTemplate,
  workoutGoalEnum,
} from '../workout/workout-template.schema';

export const GENDERS = ['Male', 'Female'] as const;
export const EXPERIENCE_LEVEL = ['expert', 'intermediate', 'beginner'] as const;

export const genderEnum = pgEnum('gender', GENDERS);
export const experienceEnum = pgEnum('experience', EXPERIENCE_LEVEL);

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
  height: numeric('height'),
  weight: numeric('weight'),
  weightGoal: numeric('weightGoal'),
  calorieGoal: numeric('calorieGoal'),
  emergencyContact: text('emergencyContact'),
  gender: genderEnum('gender').default('Male'),
  profilePic: text('profilePic'),
  active: boolean('active').default(true),
  experience: experienceEnum('experience').default('intermediate'),
  goal: workoutGoalEnum('goal').default('Stay fit'),
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
