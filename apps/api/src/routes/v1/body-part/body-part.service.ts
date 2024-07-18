import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_bodyPart } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type BodyPart = typeof TB_bodyPart.$inferSelect;

class BodyPartService {
  getBodyPartList(query: Request['query']) {
    return getListQueryWithFilters(TB_bodyPart, query);
  }

  getAllBodyParts() {
    return db.select().from(TB_bodyPart);
  }

  getTotalCount() {
    return getTotalCount(TB_bodyPart);
  }

  createBodyPart(payload: typeof TB_bodyPart.$inferInsert) {
    return db.insert(TB_bodyPart).values(payload).returning();
  }

  updateBodyPart(
    payload: Partial<typeof TB_bodyPart.$inferInsert>,
    id: BodyPart['id'],
  ) {
    return db
      .update(TB_bodyPart)
      .set(payload)
      .where(eq(TB_bodyPart.id, id))
      .returning();
  }

  deleteBodyPart(id: BodyPart['id']) {
    return db.delete(TB_bodyPart).where(eq(TB_bodyPart.id, id));
  }

  getByID(id: BodyPart['id']) {
    return db.query.TB_bodyPart.findFirst({
      where: eq(TB_bodyPart.id, id),
    });
  }
}

export const bodyPartService = new BodyPartService();
