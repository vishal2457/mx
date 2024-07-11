import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_userBookmark } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type UserBookmark = typeof TB_userBookmark.$inferSelect;


class UserBookmarkService {
  getUserBookmarkList(query: Request['query']) {
    return getListQueryWithFilters(TB_userBookmark, query);
  }

  getAllUserBookmarks() {
    return db.select().from(TB_userBookmark);
  }

  getTotalCount() {
    return getTotalCount(TB_userBookmark);
  }

  createUserBookmark(payload: typeof TB_userBookmark.$inferInsert) {
    return db.insert(TB_userBookmark).values(payload).returning();
  }

  updateUserBookmark(
    payload: Partial<typeof TB_userBookmark.$inferInsert>,
    id: UserBookmark['id']) {
    return db
      .update(TB_userBookmark)
      .set(payload)
      .where(eq(TB_userBookmark.id, id))
      .returning();
  }

  deleteUserBookmark(id: UserBookmark['id']) {
    return db.delete(TB_userBookmark).where(eq(TB_userBookmark.id, id));
  }

  getByID(id: UserBookmark['id']) {
    return db.select().from(TB_userBookmark).where(eq(TB_userBookmark.id, id));
  }

}

export const userBookmarkService = new UserBookmarkService();
