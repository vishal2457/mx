import { pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';

export const EXERCISE_LEVEL = ['Advanced', 'Intermediate', 'Beginner'] as const;
export const levelEnum = pgEnum('level', EXERCISE_LEVEL);

export const TB_exercise = pgTable('exercise', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  level: levelEnum('level').notNull(),
  referenceURL: text('referenceURL'),
});

export const Z_exercise = createSelectSchema(TB_exercise, {
  referenceURL: (schema) => schema.referenceURL.url(),
});
export type TExercise = typeof TB_exercise.$inferSelect;
