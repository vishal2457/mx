import { eq } from 'drizzle-orm';
import { Request } from 'express';
import {
  TB_organisation,
  TB_user,
  TB_userRole,
  TUserRole,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

class UserService {
  createUser(payload: typeof TB_user.$inferInsert, tx?: any) {
    const ex: typeof db = tx || db;
    return ex.insert(TB_user).values(payload).returning();
  }

  getUserList(query: Request['query']) {
    return getListQueryWithFilters(TB_user, query).execute();
  }

  getTotalUserCount() {
    return getTotalCount(TB_user);
  }

  getAll() {
    return db.select().from(TB_user);
  }

  getUserByEmail(email: string) {
    return db.query.TB_user.findFirst({
      where: eq(TB_user.email, email),
    });
  }

  deleteUserByID(id: (typeof TB_user.$inferSelect)['id']) {
    return db.delete(TB_user).where(eq(TB_user.id, id));
  }

  // get user by id
  getUserByID(id: (typeof TB_user.$inferSelect)['id']) {
    return db
      .select()
      .from(TB_user)
      .leftJoin(TB_organisation, eq(TB_user.organisationID, TB_organisation.id))
      .leftJoin(TB_userRole, eq(TB_user.id, TB_userRole.userID))
      .where(eq(TB_user.id, id));
  }

  updateUserByID(
    payload: Partial<typeof TB_user.$inferInsert>,
    id: (typeof TB_user.$inferSelect)['id'],
    tx?: any,
  ) {
    const ex = tx || db;
    return ex
      .update(TB_user)
      .set(payload)
      .where(eq(TB_user.id, id))
      .returning();
  }

  deleteUserRoleByUserID(userID: TUserRole['userID'], tx?: any) {
    const ex = tx || db;
    return ex.delete(TB_userRole).where(eq(TB_userRole.userID, userID));
  }

  createBulkUserRole(
    payload: Array<typeof TB_userRole.$inferInsert>,
    tx?: any,
  ) {
    const ex = tx || db;
    return ex.insert(TB_userRole).values(payload);
  }
}

export const userService = new UserService();
