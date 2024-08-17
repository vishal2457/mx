import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_memberPlan } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type MemberPlan = typeof TB_memberPlan.$inferSelect;


class MemberPlanService {
  getMemberPlanList(query: Request['query']) {
    return getListQueryWithFilters(TB_memberPlan, query);
  }

  getAllMemberPlans() {
    return db.select().from(TB_memberPlan);
  }

  getTotalCount() {
    return getTotalCount(TB_memberPlan);
  }

  createMemberPlan(payload: typeof TB_memberPlan.$inferInsert) {
    return db.insert(TB_memberPlan).values(payload).returning();
  }

  updateMemberPlan(
    payload: Partial<typeof TB_memberPlan.$inferInsert>,
    id: MemberPlan['id']) {
    return db
      .update(TB_memberPlan)
      .set(payload)
      .where(eq(TB_memberPlan.id, id))
      .returning();
  }

  deleteMemberPlan(id: MemberPlan['id']) {
    return db.delete(TB_memberPlan).where(eq(TB_memberPlan.id, id));
  }

  getByID(id: MemberPlan['id']) {
    return db.query.TB_memberPlan.findFirst({
      where: eq(TB_memberPlan.id, id),
    });
  }

}

export const memberPlanService = new MemberPlanService();
