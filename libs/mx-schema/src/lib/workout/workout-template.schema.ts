import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
} from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { TB_organisation } from '../organisation/organisation.schema';

export const TEMPLATE_TARGET = [
  'Over Weight',
  'Normal',
  'Under Weight',
  'Obese',
] as const;
export const targetEnum = pgEnum('target', TEMPLATE_TARGET);

export const WORKOUT_INTENSITY = ['Fast', 'Moderate', 'Slow'] as const;
export const workoutIntensityEnum = pgEnum(
  'workoutIntensity',
  WORKOUT_INTENSITY,
);

export const TB_workoutTemplate = pgTable('workoutTemplate', {
  id: serial('id').primaryKey(),
  organisationID: integer('organisationID')
    .notNull()
    .references(() => TB_organisation.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  target: targetEnum('target').default('Normal'),
  intensity: workoutIntensityEnum('intensity').default('Moderate'),
  approxCalorieBurn: integer('approxCalorieBurn').notNull(),
  approxTimeToCompleteInM: integer('approxTimeToCompleteInM').default(45),
  active: boolean('active').default(true),
});

export const Z_workoutTemplate = createSelectSchema(TB_workoutTemplate);
export type TWorkoutTemplate = typeof TB_workoutTemplate.$inferSelect;
