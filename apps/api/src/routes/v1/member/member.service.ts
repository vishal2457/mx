import {
  and,
  count,
  desc,
  eq,
  exists,
  gte,
  ne,
  not,
  sql,
  sum,
} from 'drizzle-orm';
import { Request } from 'express';
import {
  TB_member,
  TB_memberAttendance,
  TB_memberPlan,
  TB_memberWeightHistory,
  TB_memberWorkoutLog,
  TB_organisation,
  TB_plan,
  TB_user,
  TB_workoutTemplate,
  TMemberPlan,
  TmemberWorkoutLog,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCountByOrg } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Member = typeof TB_member.$inferSelect;

class MemberService {
  // stored procedure
  private countMemberAddedByMonth = db
    .select({ count: count() })
    .from(TB_member)
    .where(
      sql`EXTRACT (YEAR FROM ${TB_member.createdAt}) = ${sql.placeholder('year')} AND EXTRACT (MONTH FROM ${TB_member.createdAt}) = ${sql.placeholder('month')} AND ${TB_member.organisationID} = ${sql.placeholder('organisationID')}`,
    )
    .prepare('countMemberAddedByMonth');

  private revenueByMonth = db
    .select({ amount: sum(TB_memberPlan.amount) })
    .from(TB_memberPlan)
    .leftJoin(TB_member, eq(TB_memberPlan.memberID, TB_member.id))
    .where(
      and(
        sql`EXTRACT (YEAR FROM ${TB_memberPlan.startDate}) = ${sql.placeholder('year')} AND EXTRACT (MONTH FROM ${TB_memberPlan.startDate}) = ${sql.placeholder('month')} AND ${TB_member.organisationID} = ${sql.placeholder('organisationID')}`,
        eq(TB_memberPlan.paid, true),
      ),
    )
    .prepare('revenueByMonth');

  private lastNMonthRevenue = db
    .select({
      month: sql`DATE_TRUNC('month', ${TB_memberPlan.startDate})`.as('month'),
      totalAmount: sql`SUM(${TB_memberPlan.amount})`.as('total_amount'),
    })
    .from(TB_memberPlan)
    .leftJoin(TB_member, eq(TB_memberPlan.memberID, TB_member.id))
    .where(
      and(
        sql`${TB_memberPlan.startDate} >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '6 months'`,
        eq(TB_member.organisationID, sql.placeholder('organisationID')),
        eq(TB_memberPlan.paid, true),
      ),
    )
    .groupBy(sql`DATE_TRUNC('month', ${TB_memberPlan.startDate})`)
    .orderBy(desc(sql`month`))
    .prepare('last-seven-month-revenue');

  getMemberList(
    query: Request['query'],
    organisationID: Member['organisationID'],
  ) {
    return getListQueryWithFilters(TB_member, query, [
      eq(TB_member.organisationID, organisationID),
    ]);
  }

  getAllMembers() {
    return db.select().from(TB_member);
  }

  getTotalCount(
    organisationID: Member['organisationID'],
    active?: Member['active'],
  ) {
    const q = getTotalCountByOrg(TB_member).where(
      eq(TB_member.organisationID, organisationID),
    );
    if (active) {
      q.where(
        and(
          eq(TB_member.active, true),
          eq(TB_member.organisationID, organisationID),
        ),
      );
    }
    return q;
  }

  createMember(payload: typeof TB_member.$inferInsert, tx?: typeof db) {
    const ex = tx || db;
    return ex.insert(TB_member).values(payload).returning();
  }

  updateMember(
    payload: Partial<typeof TB_member.$inferInsert>,
    id: Member['id'],
  ) {
    return db
      .update(TB_member)
      .set(payload)
      .where(eq(TB_member.id, id))
      .returning();
  }

  deleteMember(id: Member['id']) {
    return db.delete(TB_member).where(eq(TB_member.id, id));
  }

  getByID(id: Member['id']) {
    return db
      .select()
      .from(TB_member)
      .leftJoin(
        TB_workoutTemplate,
        eq(TB_member.workoutTemplateID, TB_workoutTemplate.id),
      )
      .leftJoin(TB_user, eq(TB_member.userID, TB_user.id))
      .leftJoin(
        TB_organisation,
        eq(TB_member.organisationID, TB_organisation.id),
      )
      .where(eq(TB_member.id, id));
  }

  getByEmail(email: Member['email'], omitID?: Member['id']) {
    let where = eq(TB_member.email, email);
    if (omitID) {
      where = and(eq(TB_member.email, email), not(eq(TB_member.id, omitID)));
    }

    return db
      .select()
      .from(TB_member)
      .where(where)
      .leftJoin(
        TB_workoutTemplate,
        eq(TB_member.workoutTemplateID, TB_workoutTemplate.id),
      )
      .leftJoin(TB_user, eq(TB_member.userID, TB_user.id))
      .leftJoin(
        TB_organisation,
        eq(TB_member.organisationID, TB_organisation.id),
      );
  }

  // start new subscription
  addPlan(body: typeof TB_memberPlan.$inferInsert, tx?: typeof db) {
    const ex = tx || db;
    return ex.insert(TB_memberPlan).values(body).returning();
  }

  updatePlan(
    payload: typeof TB_memberPlan.$inferInsert,
    id: TMemberPlan['id'],
  ) {
    return db
      .update(TB_memberPlan)
      .set(payload)
      .where(eq(TB_memberPlan.id, id));
  }

  // get active membership by member id
  getActiveMemberShip(
    memberID: TMemberPlan['memberID'],
    omitID?: TMemberPlan['id'],
  ) {
    const where = [
      eq(TB_memberPlan.memberID, memberID),
      sql`${TB_memberPlan.endDate} > CURRENT_TIMESTAMP`,
    ];

    if (omitID) {
      where.push(ne(TB_memberPlan.id, omitID));
    }
    return db
      .select()
      .from(TB_memberPlan)
      .where(and(...where))
      .orderBy(desc(TB_memberPlan.id))
      .limit(1);
  }

  getMembershipByMemberID(memberID: TMemberPlan['memberID']) {
    return db
      .select()
      .from(TB_memberPlan)
      .where(eq(TB_memberPlan.memberID, memberID));
  }

  getMemberShipCountByMemberID(memberID: TMemberPlan['memberID']) {
    return db
      .select({ count: count() })
      .from(TB_memberPlan)
      .where(eq(TB_memberPlan.memberID, memberID));
  }

  getMemberTotalSpent(memberID: Member['id']) {
    return db
      .select({ amount: sum(TB_memberPlan.amount) })
      .from(TB_memberPlan)
      .groupBy(sql`${TB_memberPlan.memberID}, ${TB_memberPlan.paid}`)
      .having(
        and(eq(TB_memberPlan.memberID, memberID), eq(TB_memberPlan.paid, true)),
      );
  }

  createMemberAttendance(payload: typeof TB_memberAttendance.$inferInsert) {
    return db.insert(TB_memberAttendance).values(payload).returning();
  }

  createMemberWeightHistory(
    payload: typeof TB_memberWeightHistory.$inferInsert,
  ) {
    return db.insert(TB_memberWeightHistory).values(payload).returning();
  }

  getWeightHistory(memberID: Member['id']) {
    return db
      .select()
      .from(TB_memberWeightHistory)
      .where(eq(TB_memberWeightHistory.memberID, memberID))
      .orderBy(desc(TB_memberWeightHistory.id))
      .limit(7);
  }

  getCountMemberAddedByMonth(params: {
    month: number;
    year: number;
    organisationID: number;
  }) {
    return this.countMemberAddedByMonth.execute(params);
  }

  getRevenueByMonth(params: {
    month: number;
    year: number;
    organisationID: number;
  }) {
    return this.revenueByMonth.execute(params);
  }

  getLastNMonthRevenue(organisationID: Member['organisationID']) {
    return this.lastNMonthRevenue.execute({
      organisationID,
    });
  }

  createManyWorkoutLogs(payload: (typeof TB_memberWorkoutLog.$inferInsert)[]) {
    return db.insert(TB_memberWorkoutLog).values(payload);
  }

  deleteWorkoutLog(id: TmemberWorkoutLog['id']) {
    return db.delete(TB_memberWorkoutLog).where(eq(TB_memberWorkoutLog.id, id));
  }

  getLastNMonthsWorkoutLogs(
    memberID: TmemberWorkoutLog['memberID'],
    months = 2,
  ) {
    return db
      .select()
      .from(TB_memberWorkoutLog)
      .where(
        and(
          eq(TB_memberWorkoutLog.memberID, memberID),
          gte(
            sql`DATE_TRUNC('month', ${TB_memberWorkoutLog.createdAt})`,
            sql.raw(
              `DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '${months} months'`,
            ),
          ),
        ),
      )
      .orderBy(TB_memberWorkoutLog.createdAt);
  }

  memberPlanCount(organisationID: Member['organisationID']) {
    return getTotalCountByOrg(TB_memberPlan)
      .innerJoin(TB_member, eq(TB_memberPlan.memberID, TB_member.id))
      .innerJoin(
        TB_organisation,
        eq(TB_member.organisationID, TB_organisation.id),
      )
      .where(eq(TB_member.organisationID, organisationID));
  }

  memberPlanList(
    query: Request['query'],
    organisationID: Member['organisationID'],
  ) {
    return getListQueryWithFilters(TB_memberPlan, query)
      .innerJoin(TB_member, eq(TB_memberPlan.memberID, TB_member.id))
      .innerJoin(
        TB_organisation,
        and(
          eq(TB_member.organisationID, TB_organisation.id),
          eq(TB_member.organisationID, organisationID),
        ),
      );
  }

  memberWorkoutLog(
    query: Request['query'],
    memberID: TmemberWorkoutLog['memberID'],
  ) {
    return getListQueryWithFilters(TB_memberWorkoutLog, query, [
      eq(TB_memberWorkoutLog.memberID, memberID),
    ]);
  }

  memberWorkoutLogCount(memberID: TmemberWorkoutLog['memberID']) {
    return getTotalCountByOrg(TB_memberWorkoutLog).where(
      eq(TB_memberWorkoutLog.memberID, memberID),
    );
  }

  getAtRisk(organisationID: Member['organisationID']) {
    const activePlanSubquery = db
      .select()
      .from(TB_memberPlan)
      .where(
        and(
          eq(TB_memberWorkoutLog.memberID, TB_memberPlan.memberID),
          sql`${TB_memberPlan.endDate} > NOW()`,
        ),
      );
    return db
      .selectDistinctOn([TB_memberWorkoutLog.memberID])
      .from(TB_memberWorkoutLog)
      .leftJoin(
        TB_memberPlan,
        eq(TB_memberWorkoutLog.memberID, TB_memberPlan.memberID),
      )
      .leftJoin(TB_member, eq(TB_memberWorkoutLog.memberID, TB_member.id))
      .where(
        and(
          sql`${TB_memberWorkoutLog.createdAt} < NOW() - INTERVAL '7 days'`,
          exists(activePlanSubquery),
          eq(TB_member.organisationID, organisationID),
        ),
      );
  }
}

export const memberService = new MemberService();
