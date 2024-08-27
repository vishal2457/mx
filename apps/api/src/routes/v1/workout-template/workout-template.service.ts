import { and, count, desc, eq, isNull, ne, not, sql } from 'drizzle-orm';
import { Request } from 'express';
import {
  TB_exercise,
  TB_memberWorkoutLog,
  TB_workoutTemplate,
  TB_workoutTemplateDetail,
  TMember,
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
    tx?: typeof db,
  ) {
    const ex = tx || db;
    return ex.insert(TB_workoutTemplate).values(payload).returning();
  }

  updateWorkoutTemplate(
    payload: Partial<typeof TB_workoutTemplate.$inferInsert>,
    id: WorkoutTemplate['id'],
    tx?: typeof db,
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

  addWorkoutDetails(workoutDetails: WorkoutDetailsInsert, tx?: typeof db) {
    const ex = tx || db;
    return ex.insert(TB_workoutTemplateDetail).values(workoutDetails);
  }

  deleteWorkoutTemplateDetails(id: WorkoutTemplate['id'], tx?: typeof db) {
    const ex = tx || db;
    return ex
      .delete(TB_workoutTemplateDetail)
      .where(eq(TB_workoutTemplateDetail.workoutTemplateID, id));
  }

  getWorkoutTemplateDetailCount(workoutTemplateID: WorkoutTemplate['id']) {
    return db
      .select({ count: count() })
      .from(TB_workoutTemplateDetail)
      .where(eq(TB_workoutTemplateDetail.workoutTemplateID, workoutTemplateID))
      .groupBy(TB_workoutTemplateDetail.day);
  }

  getLastWorkoutDay(memberID: TMember['id']) {
    return db
      .select({
        day: TB_workoutTemplateDetail.day,
        workoutTemplateID: TB_workoutTemplateDetail.workoutTemplateID,
      })
      .from(TB_memberWorkoutLog)
      .leftJoin(
        TB_workoutTemplateDetail,
        eq(
          TB_memberWorkoutLog.workoutTemplateDetailID,
          TB_workoutTemplateDetail.id,
        ),
      )
      .where(
        and(
          eq(TB_memberWorkoutLog.memberID, memberID),
          ne(sql`DATE(${TB_memberWorkoutLog.createdAt})`, sql`CURRENT_DATE`),
        ),
      )
      .orderBy(desc(TB_memberWorkoutLog.id))
      .limit(1);
  }

  getTodaysWorkout(
    day: 'day1' | 'day2' | 'day3' | 'day4' | 'day5' | 'day6' | 'day7',
    workoutTemplateID: number,
    memberID: TMember['id'],
  ) {
    return db
      .select()
      .from(TB_workoutTemplateDetail)
      .leftJoin(
        TB_exercise,
        eq(TB_workoutTemplateDetail.exerciseID, TB_exercise.id),
      )
      .leftJoin(
        TB_memberWorkoutLog,
        and(
          eq(
            TB_memberWorkoutLog.workoutTemplateDetailID,
            TB_workoutTemplateDetail.id,
          ),
          eq(TB_memberWorkoutLog.memberID, memberID),
          sql`DATE(${TB_memberWorkoutLog.createdAt}) = CURRENT_DATE`,
        ),
      )
      .where(
        and(
          eq(TB_workoutTemplateDetail.day, day),
          eq(TB_workoutTemplateDetail.workoutTemplateID, workoutTemplateID),
        ),
      );
  }

  getWorkoutLoggedManuallyToday(memberID: TMember['id']) {
    return db
      .select()
      .from(TB_memberWorkoutLog)
      .where(
        and(
          eq(TB_memberWorkoutLog.memberID, memberID),
          sql`DATE(${TB_memberWorkoutLog.createdAt}) = CURRENT_DATE`,
          isNull(TB_memberWorkoutLog.workoutTemplateDetailID),
        ),
      );
  }
}

export const workoutTemplateService = new WorkoutTemplateService();
