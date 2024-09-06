import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_plan } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import {
  getTotalCount,
  getTotalCountByOrg,
} from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Plan = typeof TB_plan.$inferSelect;

class PlanService {
  getPlanList(query: Request['query'], organisationID: Plan['organisationID']) {
    return getListQueryWithFilters(TB_plan, query, [
      eq(TB_plan.organisationID, organisationID),
    ]);
  }

  getAllPlans() {
    return db.select().from(TB_plan);
  }

  getTotalCount(organisationID: Plan['organisationID']) {
    return getTotalCountByOrg(TB_plan).where(
      eq(TB_plan.organisationID, organisationID),
    );
  }

  createPlan(payload: typeof TB_plan.$inferInsert) {
    return db.insert(TB_plan).values(payload).returning();
  }

  updatePlan(payload: Partial<typeof TB_plan.$inferInsert>, id: Plan['id']) {
    return db
      .update(TB_plan)
      .set(payload)
      .where(eq(TB_plan.id, id))
      .returning();
  }

  deletePlan(id: Plan['id']) {
    return db.delete(TB_plan).where(eq(TB_plan.id, id));
  }

  getByID(id: Plan['id']) {
    return db.select().from(TB_plan).where(eq(TB_plan.id, id));
  }
}

export const planService = new PlanService();
