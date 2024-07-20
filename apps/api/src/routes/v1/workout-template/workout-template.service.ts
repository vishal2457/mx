import { eq } from 'drizzle-orm';
import { Request } from 'express';
import {
  TB_workoutTemplate,
  TB_workoutTemplateDetail,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';
import { createInsertSchema } from 'drizzle-zod';

type WorkoutTemplate = typeof TB_workoutTemplate.$inferSelect;
type WorkoutDetailsInsert = typeof TB_workoutTemplateDetail.$inferInsert;

class WorkoutTemplateService {
  getWorkoutTemplateList(query: Request['query']) {
    return getListQueryWithFilters(TB_workoutTemplate, query);
  }

  getAllActiveWorkoutTemplates() {
    return db
      .select()
      .from(TB_workoutTemplate)
      .where(eq(TB_workoutTemplate.active, true));
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
  ) {
    return db
      .update(TB_workoutTemplate)
      .set(payload)
      .where(eq(TB_workoutTemplate.id, id))
      .returning();
  }

  deleteWorkoutTemplate(id: WorkoutTemplate['id']) {
    return db.delete(TB_workoutTemplate).where(eq(TB_workoutTemplate.id, id));
  }

  getByID(id: WorkoutTemplate['id']) {
    return db.query.TB_workoutTemplate.findFirst({
      where: eq(TB_workoutTemplate.id, id),
    });
  }

  addWorkoutDetails(workoutDetails: WorkoutDetailsInsert) {
    return db.insert(TB_workoutTemplateDetail).values(workoutDetails);
  }
}

export const workoutTemplateService = new WorkoutTemplateService();
