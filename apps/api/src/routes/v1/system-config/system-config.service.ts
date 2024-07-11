import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_systemConfig } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type SystemConfig = typeof TB_systemConfig.$inferSelect;


class SystemConfigService {
  getSystemConfigList(query: Request['query']) {
    return getListQueryWithFilters(TB_systemConfig, query);
  }

  getAllSystemConfigs() {
    return db.select().from(TB_systemConfig);
  }

  getTotalCount() {
    return getTotalCount(TB_systemConfig);
  }

  createSystemConfig(payload: typeof TB_systemConfig.$inferInsert) {
    return db.insert(TB_systemConfig).values(payload).returning();
  }

  updateSystemConfig(
    payload: Partial<typeof TB_systemConfig.$inferInsert>,
    id: SystemConfig['id']) {
    return db
      .update(TB_systemConfig)
      .set(payload)
      .where(eq(TB_systemConfig.id, id))
      .returning();
  }

  deleteSystemConfig(id: SystemConfig['id']) {
    return db.delete(TB_systemConfig).where(eq(TB_systemConfig.id, id));
  }

  getByID(id: SystemConfig['id']) {
    return db.select().from(TB_systemConfig).where(eq(TB_systemConfig.id, id));
  }

}

export const systemConfigService = new SystemConfigService();
