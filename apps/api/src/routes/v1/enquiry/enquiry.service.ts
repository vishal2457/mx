import { and, count, eq } from 'drizzle-orm';
import { Request } from 'express';
import {
  TB_enquiry,
  TB_enquiryStatusHistory,
  TB_user,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Enquiry = typeof TB_enquiry.$inferSelect;

class EnquiryService {
  getEnquiryList(
    query: Request['query'],
    organisationID: Enquiry['organisationID'],
  ) {
    const q = getListQueryWithFilters(TB_enquiry, query, [
      eq(TB_enquiry.organisationID, organisationID),
    ]);
    return q;
  }

  getAllEnquirys() {
    return db.select().from(TB_enquiry);
  }

  getTotalCount() {
    return getTotalCount(TB_enquiry);
  }

  createEnquiry(payload: typeof TB_enquiry.$inferInsert, tx: any) {
    const ex = tx || db;
    return ex.insert(TB_enquiry).values(payload).returning();
  }

  updateEnquiry(
    payload: Partial<typeof TB_enquiry.$inferInsert>,
    id: Enquiry['id'],
    tx: any,
  ) {
    const ex = tx || db;
    return ex
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

  getStatusOpenCount(organisationID: Enquiry['organisationID']) {
    return db
      .select({ count: count() })
      .from(TB_enquiry)
      .where(
        and(
          eq(TB_enquiry.status, 'Open'),
          eq(TB_enquiry.organisationID, organisationID),
        ),
      );
  }

  addEnquiryStatusHistory(
    payload: typeof TB_enquiryStatusHistory.$inferInsert,
    tx: any,
  ) {
    const ex = tx || db;
    return ex.insert(TB_enquiryStatusHistory).values(payload);
  }

  getStatusHistory(enquiryID: Enquiry['id']) {
    return db
      .select()
      .from(TB_enquiryStatusHistory)
      .leftJoin(TB_user, eq(TB_enquiryStatusHistory.userID, TB_user.id))
      .where(eq(TB_enquiryStatusHistory.enquiryID, enquiryID));
  }
}

export const enquiryService = new EnquiryService();
