import { TB_LandingPageLead } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';

type InsertLandingPageLead = typeof TB_LandingPageLead.$inferInsert;

class LandingPageLeadService {
  create(payload: InsertLandingPageLead) {
    return db.insert(TB_LandingPageLead).values(payload);
  }
}

export const landingPageLeadService = new LandingPageLeadService();
