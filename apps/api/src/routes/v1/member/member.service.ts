import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_member } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Member = typeof TB_member.$inferSelect;


class MemberService {
  getMemberList(query: Request['query']) {
    return getListQueryWithFilters(TB_member, query);
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
    id: Member['id']) {
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

}

export const memberService = new MemberService();
