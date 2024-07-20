import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { TB_exercise } from './exercise.schema';
import { TB_workoutTemplate } from './workout-template.schema';

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
  timeInS: text('timeInS'),
  additionInstruction: text('additionInstruction'),
});

export const Z_workoutTemplateDetail = createSelectSchema(
  TB_workoutTemplateDetail,
);
export type TWorkoutTemplateDetail =
  typeof TB_workoutTemplateDetail.$inferSelect;
