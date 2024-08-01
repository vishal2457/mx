import { and, eq } from 'drizzle-orm';
import { Request } from 'express';
import {
  TB_exercise,
  TB_workoutTemplate,
  TB_workoutTemplateDetail,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type WorkoutTemplate = typeof TB_workoutTemplate.$inferSelect;
type WorkoutDetailsInsert = typeof TB_workoutTemplateDetail.$inferInsert;

class WorkoutTemplateService {
  getWorkoutTemplateList(
    query: Request['query'],
    organisationID: WorkoutTemplate['organisationID'],
  ) {
    return getListQueryWithFilters(TB_workoutTemplate, query, [
      eq(TB_workoutTemplate.organisationID, organisationID),
    ]);
  }

  getAllActiveWorkoutTemplates(
    organisationID: WorkoutTemplate['organisationID'],
  ) {
    return db
      .select()
      .from(TB_workoutTemplate)
      .where(
        and(
          eq(TB_workoutTemplate.active, true),
          eq(TB_workoutTemplate.organisationID, organisationID),
        ),
      );
  }

  getTotalCount() {
    return getTotalCount(TB_workoutTemplate);
  }

  createWorkoutTemplate(
    payload: typeof TB_workoutTemplate.$inferInsert,
    tx: any,
  ) {
    const ex = tx || db;
    return ex.insert(TB_workoutTemplate).values(payload).returning();
  }

  updateWorkoutTemplate(
    payload: Partial<typeof TB_workoutTemplate.$inferInsert>,
    id: WorkoutTemplate['id'],
    tx?: any,
  ) {
    const ex = tx || db;
    return ex
      .update(TB_workoutTemplate)
      .set(payload)
      .where(eq(TB_workoutTemplate.id, id))
      .returning();
  }

  deleteWorkoutTemplate(id: WorkoutTemplate['id']) {
    return db.delete(TB_workoutTemplate).where(eq(TB_workoutTemplate.id, id));
  }

  getByID(id: WorkoutTemplate['id']) {
    return db
      .select()
      .from(TB_workoutTemplate)
      .innerJoin(
        TB_workoutTemplateDetail,
        eq(TB_workoutTemplate.id, TB_workoutTemplateDetail.workoutTemplateID),
      )
      .innerJoin(
        TB_exercise,
        eq(TB_exercise.id, TB_workoutTemplateDetail.exerciseID),
      )
      .where(eq(TB_workoutTemplate.id, id));
  }

  addWorkoutDetails(workoutDetails: WorkoutDetailsInsert, tx?: any) {
    const ex = tx || db;
    return ex.insert(TB_workoutTemplateDetail).values(workoutDetails);
  }

  deleteWorkoutTemplateDetails(id: WorkoutTemplate['id'], tx?: any) {
    const ex = tx || db;
    return ex
      .delete(TB_workoutTemplateDetail)
      .where(eq(TB_workoutTemplateDetail.workoutTemplateID, id));
  }
}

export const workoutTemplateService = new WorkoutTemplateService();
