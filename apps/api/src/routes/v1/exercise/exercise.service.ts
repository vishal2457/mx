import { eq } from 'drizzle-orm';
import { Request } from 'express';
import {
  TB_exercise,
  TB_exerciseBody,
  TExerciseBody,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCountByOrg } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Exercise = typeof TB_exercise.$inferSelect;
type ExerciseInsert = typeof TB_exercise.$inferInsert;

class ExerciseService {
  getExerciseList(query: Request['query'], organisationID: Exercise['id']) {
    return getListQueryWithFilters(TB_exercise, query, [
      eq(TB_exercise.organisationID, organisationID),
    ]);
  }

  getAllExercises(organisationID: Exercise['organisationID']) {
    return db
      .select()
      .from(TB_exercise)
      .where(eq(TB_exercise.organisationID, organisationID));
  }

  getTotalCount(organisationID: Exercise['organisationID']) {
    return getTotalCountByOrg(TB_exercise).where(
      eq(TB_exercise.organisationID, organisationID),
    );
  }

  createExercise(payload: ExerciseInsert | ExerciseInsert[], tx?: typeof db) {
    const ex = tx || db;
    return ex
      .insert(TB_exercise)
      .values(payload as ExerciseInsert)
      .returning();
  }

  updateExercise(
    payload: Partial<typeof TB_exercise.$inferInsert>,
    id: Exercise['id'],
    tx: any,
  ) {
    const ex = db || tx;
    return ex
      .update(TB_exercise)
      .set(payload)
      .where(eq(TB_exercise.id, id))
      .returning();
  }

  deleteExercise(id: Exercise['id']) {
    return db.delete(TB_exercise).where(eq(TB_exercise.id, id));
  }

  getByID(id: Exercise['id']) {
    return db
      .select()
      .from(TB_exercise)
      .leftJoin(TB_exerciseBody, eq(TB_exercise.id, TB_exerciseBody.exerciseID))
      .where(eq(TB_exercise.id, id));
  }

  addExerciseBody(exerciseBody: TExerciseBody[], tx?: any) {
    const ex = tx || db;
    return ex.insert(TB_exerciseBody).values(exerciseBody);
  }

  deleteExerciseBody(id: Exercise['id'], tx?: any) {
    const ex = tx || db;
    return ex.delete(TB_exerciseBody).where(eq(TB_exerciseBody.exerciseID, id));
  }
}

export const exerciseService = new ExerciseService();
