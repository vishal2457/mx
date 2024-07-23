import { integer, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { TB_exercise } from './exercise.schema';
import { TB_workoutTemplate } from './workout-template.schema';

export const DAYS = ['1', '2', '3', '4', '5', '6', '7'] as const;
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
  restBwRepsInS: text('restBwRepsInS').notNull(),
  timeInM: text('timeInM'),
  additionInstruction: text('additionInstruction'),
  day: daysEnum('day').default('1'),
});

export const Z_workoutTemplateDetail = createSelectSchema(
  TB_workoutTemplateDetail,
);
export type TWorkoutTemplateDetail =
  typeof TB_workoutTemplateDetail.$inferSelect;
