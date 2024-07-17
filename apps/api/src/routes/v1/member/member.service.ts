import { and, count, desc, eq, sql, sum } from 'drizzle-orm';
import { Request } from 'express';
import {
  TB_member,
  TB_memberAttendance,
  TB_memberPlan,
  TB_plan,
  TB_user,
  TMemberPlan,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Member = typeof TB_member.$inferSelect;

class MemberService {
  getMemberList(query: Request['query']) {
    return getListQueryWithFilters(TB_member, query).leftJoin(
      TB_user,
      eq(TB_member.userID, TB_user.id),
    );
  }

  getAllMembers() {
    return db.select().from(TB_member);
  }

  getTotalCount() {
    return getTotalCount(TB_member);
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
    return db.insert(TB_memberPlan).values(body);
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
}

export const memberService = new MemberService();
