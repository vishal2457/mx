import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import { workoutIntensityEnum } from '../workout/workout-template.schema';
import { TB_member } from './member.schema';
import { daysEnum } from '../workout/workout-template-detail.schema';

export const TB_memberWorkoutLog = pgTable('memberWorkoutLog', {
  id: serial('id').primaryKey(),
  memberID: integer('memberID')
    .notNull()
    .references(() => TB_member.id),
  workoutTemplateDetailID: integer('workoutTemplateDetailID'),
  day: daysEnum('day').default('day1').notNull(),
  sets: integer('sets').notNull(),
  reps: text('reps').notNull(),
  exerciseName: text('exerciseName').notNull(),
  completedTime: integer('completedTime').notNull(),
  intensity: workoutIntensityEnum('intensity').default('Moderate'),
  approxCalorieBurn: integer('approxCalorieBurn'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const Z_memberWorkoutLog = createSelectSchema(TB_memberWorkoutLog);
export type TmemberWorkoutLog = typeof TB_memberWorkoutLog.$inferSelect;
