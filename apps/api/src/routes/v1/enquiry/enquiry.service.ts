import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_enquiry } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Enquiry = typeof TB_enquiry.$inferSelect;

class EnquiryService {
  getEnquiryList(query: Request['query']) {
    return getListQueryWithFilters(TB_enquiry, query);
  }

  getAllEnquirys() {
    return db.select().from(TB_enquiry);
  }

  getTotalCount() {
    return getTotalCount(TB_enquiry);
  }

  createEnquiry(payload: typeof TB_enquiry.$inferInsert) {
    return db.insert(TB_enquiry).values(payload).returning();
  }

  updateEnquiry(
    payload: Partial<typeof TB_enquiry.$inferInsert>,
    id: Enquiry['id'],
  ) {
    return db
      .update(TB_enquiry)
      .set(payload)
      .where(eq(TB_enquiry.id, id))
      .returning();
  }

  deleteEnquiry(id: Enquiry['id']) {
    return db.delete(TB_enquiry).where(eq(TB_enquiry.id, id));
  }

  getByID(id: Enquiry['id']) {
    return db.select().from(TB_enquiry).where(eq(TB_enquiry.id, id));
  }
}

export const enquiryService = new EnquiryService();
