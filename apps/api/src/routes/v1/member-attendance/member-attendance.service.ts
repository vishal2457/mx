import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_memberAttendance } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type MemberAttendance = typeof TB_memberAttendance.$inferSelect;

class MemberAttendanceService {
  getMemberAttendanceList(query: Request['query']) {
    return getListQueryWithFilters(TB_memberAttendance, query);
  }

  getAllMemberAttendances() {
    return db.select().from(TB_memberAttendance);
  }

  getTotalCount() {
    return getTotalCount(TB_memberAttendance);
  }

  createMemberAttendance(payload: typeof TB_memberAttendance.$inferInsert) {
    return db.insert(TB_memberAttendance).values(payload).returning();
  }

  updateMemberAttendance(
    payload: Partial<typeof TB_memberAttendance.$inferInsert>,
    id: MemberAttendance['id'],
  ) {
    return db
      .update(TB_memberAttendance)
      .set(payload)
      .where(eq(TB_memberAttendance.id, id))
      .returning();
  }

  deleteMemberAttendance(id: MemberAttendance['id']) {
    return db.delete(TB_memberAttendance).where(eq(TB_memberAttendance.id, id));
  }

  getByID(id: MemberAttendance['id']) {
    return db.query.TB_memberAttendance.findFirst({
      where: eq(TB_memberAttendance.id, id),
    });
  }
}

export const memberAttendanceService = new MemberAttendanceService();
