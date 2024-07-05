import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_userRole } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type UserRole = typeof TB_userRole.$inferSelect;


class UserRoleService {
  getUserRoleList(query: Request['query']) {
    return getListQueryWithFilters(TB_userRole, query);
  }

  getAllUserRoles() {
    return db.select().from(TB_userRole);
  }

  getTotalCount() {
    return getTotalCount(TB_userRole);
  }

  createUserRole(payload: typeof TB_userRole.$inferInsert) {
    return db.insert(TB_userRole).values(payload).returning();
  }

  updateUserRole(payload: typeof TB_userRole.$inferInsert, id: UserRole['id']) {
    return db
      .update(TB_userRole)
      .set(payload)
      .where(eq(TB_userRole.id, id))
      .returning();
  }

  deleteUserRole(id: UserRole['id']) {
    return db.delete(TB_userRole).where(eq(TB_userRole.id, id));
  }

  getByID(id: UserRole['id']) {
    return db.select().from(TB_userRole).where(eq(TB_userRole.id, id));
  }

}

export const userRoleService = new UserRoleService();
