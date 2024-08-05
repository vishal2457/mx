import { and, count, desc, eq, sql, sum } from 'drizzle-orm';
import { Request } from 'express';
import {
  TB_member,
  TB_memberAttendance,
  TB_memberPlan,
  TB_memberWeightHistory,
  TB_memberWorkoutLog,
  TB_plan,
  TB_user,
  TB_workoutTemplateDetail,
  TMemberPlan,
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
    .select({ amount: sum(TB_plan.amount) })
    .from(TB_memberPlan)
    .leftJoin(TB_plan, eq(TB_memberPlan.planID, TB_plan.id))
    .leftJoin(TB_member, eq(TB_memberPlan.memberID, TB_member.id))
    .where(
      and(
        sql`EXTRACT (YEAR FROM ${TB_memberPlan.createdAt}) = ${sql.placeholder('year')} AND EXTRACT (MONTH FROM ${TB_memberPlan.createdAt}) = ${sql.placeholder('month')} AND ${TB_member.organisationID} = ${sql.placeholder('organisationID')}`,
        eq(TB_memberPlan.paid, true),
      ),
    )
    .prepare('revenueByMonth');

  private lastNMonthRevenue = db
    .select({
      month: sql`DATE_TRUNC('month', ${TB_memberPlan.createdAt})`.as('month'),
      totalAmount: sql`SUM(${TB_plan.amount})`.as('total_amount'),
    })
    .from(TB_memberPlan)
    .leftJoin(TB_plan, eq(TB_memberPlan.planID, TB_plan.id))
    .leftJoin(TB_member, eq(TB_memberPlan.memberID, TB_member.id))
    .where(
      and(
        sql`${TB_memberPlan.createdAt} >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '6 months'`,
        eq(TB_member.organisationID, sql.placeholder('organisationID')),
        eq(TB_memberPlan.paid, true),
      ),
    )
    .groupBy(sql`DATE_TRUNC('month', ${TB_memberPlan.createdAt})`)
    .orderBy(desc(sql`month`))
    .prepare('last-seven-month-revenue');

  getMemberList(
    query: Request['query'],
    organisationID: Member['organisationID'],
  ) {
    return getListQueryWithFilters(TB_member, query)
      .leftJoin(TB_user, eq(TB_member.userID, TB_user.id))
      .where(eq(TB_member.organisationID, organisationID));
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

  createMember(payload: typeof TB_member.$inferInsert) {
    return db.insert(TB_member).values(payload).returning();
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
    return db.select().from(TB_member).where(eq(TB_member.id, id));
  }

  getByEmail(email: Member['email']) {
    return db.query.TB_member.findFirst({ where: eq(TB_member.email, email) });
  }

  // start new subscription
  addPlan(body: typeof TB_memberPlan.$inferInsert) {
    return db.insert(TB_memberPlan).values(body).returning();
  }

  // get active membership by member id
  getActiveMemberShip(memberID: TMemberPlan['memberID']) {
    return db
      .select()
      .from(TB_memberPlan)
      .where(
        and(
          eq(TB_memberPlan.memberID, memberID),
          sql`${TB_memberPlan.endDate} > CURRENT_TIMESTAMP`,
        ),
      )
      .leftJoin(TB_plan, eq(TB_memberPlan.planID, TB_plan.id))
      .orderBy(desc(TB_memberPlan.id))
      .limit(1);
  }

  getMembershipByMemberID(memberID: TMemberPlan['memberID']) {
    return db
      .select()
      .from(TB_memberPlan)
      .where(eq(TB_memberPlan.memberID, memberID))
      .leftJoin(TB_plan, eq(TB_memberPlan.planID, TB_plan.id));
  }

  getMemberShipCountByMemberID(memberID: TMemberPlan['memberID']) {
    return db
      .select({ count: count() })
      .from(TB_memberPlan)
      .where(eq(TB_memberPlan.memberID, memberID));
  }

  getMemberTotalSpent(memberID: Member['id']) {
    return db
      .select({ amount: sum(TB_plan.amount) })
      .from(TB_memberPlan)
      .leftJoin(TB_plan, eq(TB_memberPlan.planID, TB_plan.id))
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
      .where(eq(TB_memberWeightHistory.memberID, memberID));
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

  getLastWorkoutDay(memberID: Member['id']) {
    return db
      .select()
      .from(TB_memberWorkoutLog)
      .where(eq(TB_memberWorkoutLog.memberID, memberID))
      .orderBy(desc(TB_memberPlan.id))
      .limit(1);
  }

  getTodaysWorkout(
    day: 'day1' | 'day2' | 'day3' | 'day4' | 'day5' | 'day6' | 'day7',
    workoutTemplateID: number,
  ) {
    return db
      .select()
      .from(TB_workoutTemplateDetail)
      .where(
        and(
          eq(TB_workoutTemplateDetail.day, day),
          eq(TB_workoutTemplateDetail.workoutTemplateID, workoutTemplateID),
        ),
      );
  }
}

export const memberService = new MemberService();
