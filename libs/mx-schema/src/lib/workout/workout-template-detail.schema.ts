import { integer, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { TB_exercise } from './exercise.schema';
import { TB_workoutTemplate } from './workout-template.schema';

export const DAYS_KEY_VALUE = {
  day1: 'day1',
  day2: 'day2',
  day3: 'day3',
  day4: 'day4',
  day5: 'day5',
  day6: 'day6',
  day7: 'day7',
};
export const DAYS = [
  'day1',
  'day2',
  'day3',
  'day4',
  'day5',
  'day6',
  'day7',
] as const;
export const daysEnum = pgEnum('day', DAYS);

export const TB_workoutTemplateDetail = pgTable('workoutTemplateDetail', {
  id: serial('id').primaryKey(),
  workoutTemplateID: integer('workoutTemplateID')
    .notNull()
    .references(() => TB_workoutTemplate.id),
  exerciseID: integer('exerciseID')
    .notNull()
    .references(() => TB_exercise.id),
  set: integer('set').notNull(),
  reps: text('reps'),
  restBwRepsInS: integer('restBwRepsInS').notNull(),
  timeInM: integer('timeInM'),
  additionInstruction: text('additionInstruction'),
  day: daysEnum('day').default('day1').notNull(),
  dayName: text('dayName').notNull(),
  approxCalorieBurn: integer('approxCalorieBurn').notNull(),
});

export const Z_workoutTemplateDetail = createSelectSchema(
  TB_workoutTemplateDetail,
);
export type TWorkoutTemplateDetail =
  typeof TB_workoutTemplateDetail.$inferSelect;
