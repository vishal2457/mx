import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_event } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Event = typeof TB_event.$inferSelect;

class EventService {
  getEventList(query: Request['query']) {
    return getListQueryWithFilters(TB_event, query);
  }

  getAllEvents() {
    return db.select().from(TB_event);
  }

  getTotalCount() {
    return getTotalCount(TB_event);
  }

  createEvent(payload: typeof TB_event.$inferInsert) {
    return db.insert(TB_event).values(payload).returning();
  }

  updateEvent(payload: Partial<typeof TB_event.$inferInsert>, id: Event['id']) {
    return db
      .update(TB_event)
      .set(payload)
      .where(eq(TB_event.id, id))
      .returning();
  }

  deleteEvent(id: Event['id']) {
    return db.delete(TB_event).where(eq(TB_event.id, id));
  }

  getByID(id: Event['id']) {
    return db.select().from(TB_event).where(eq(TB_event.id, id));
  }
}

export const eventService = new EventService();
