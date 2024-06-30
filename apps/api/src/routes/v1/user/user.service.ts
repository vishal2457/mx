import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_user } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

class UserService {
  createUser(payload: typeof TB_user.$inferInsert) {
    return db.insert(TB_user).values(payload).returning();
  }

  getUserList(query: Request['query']) {
    return getListQueryWithFilters(TB_user, query).execute();
  }

  getTotalUserCount() {
    return getTotalCount(TB_user);
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
    return db.query.TB_user.findFirst({
      where: eq(TB_user.id, id),
    });
  }

  updateUserByID(
    payload: typeof TB_user.$inferInsert,
    id: (typeof TB_user.$inferSelect)['id']
  ) {
    return db
      .update(TB_user)
      .set(payload)
      .where(eq(TB_user.id, id))
      .returning();
  }
}

export const userService = new UserService();
