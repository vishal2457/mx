import { and, eq, ne } from 'drizzle-orm';
import { Request } from 'express';
import { TB_organisation } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Organisation = typeof TB_organisation.$inferSelect;

class OrganisationService {
  getOrganisationList(query: Request['query']) {
    return getListQueryWithFilters(TB_organisation, query);
  }

  getAllOrganisations() {
    return db.select().from(TB_organisation);
  }

  getTotalCount() {
    return getTotalCount(TB_organisation);
  }

  createOrganisation(payload: typeof TB_organisation.$inferInsert, tx: any) {
    const ex: typeof db = tx || db;
    return ex.insert(TB_organisation).values(payload).returning();
  }

  updateOrganisation(
    payload: Partial<typeof TB_organisation.$inferInsert>,
    id: Organisation['id'],
  ) {
    return db
      .update(TB_organisation)
      .set(payload)
      .where(eq(TB_organisation.id, id))
      .returning();
  }

  deleteOrganisation(id: Organisation['id']) {
    return db.delete(TB_organisation).where(eq(TB_organisation.id, id));
  }

  getByID(id: Organisation['id']) {
    return db.select().from(TB_organisation).where(eq(TB_organisation.id, id));
  }

  getByEmail(email: Organisation['email'], notID: Organisation['id']) {
    return db
      .select()
      .from(TB_organisation)
      .where(
        and(eq(TB_organisation.email, email), ne(TB_organisation.id, notID)),
      );
  }
}

export const organisationService = new OrganisationService();
