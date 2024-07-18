import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { TB_exercise } from './exercise.schema';
import { TB_bodyPart } from './body-part.schema';
import { createSelectSchema } from 'drizzle-zod';

export const TB_exerciseBody = pgTable('exerciseBody', {
  id: serial('id').primaryKey(),
  exerciseID: integer('exerciseID')
    .notNull()
    .references(() => TB_exercise.id),
  bodyPartID: integer('bodyPartID')
    .notNull()
    .references(() => TB_bodyPart.id),
});

export const Z_exerciseBody = createSelectSchema(TB_exerciseBody);
export type TExerciseBody = typeof TB_exerciseBody.$inferSelect;
