import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_permission } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Permission = typeof TB_permission.$inferSelect;


class PermissionService {
  getPermissionList(query: Request['query']) {
    return getListQueryWithFilters(TB_permission, query);
  }

  getAllPermissions() {
    return db.select().from(TB_permission);
  }

  getTotalCount() {
    return getTotalCount(TB_permission);
  }

  createPermission(payload: typeof TB_permission.$inferInsert) {
    return db.insert(TB_permission).values(payload).returning();
  }

  updatePermission(payload: typeof TB_permission.$inferInsert, id: Permission['id']) {
    return db
      .update(TB_permission)
      .set(payload)
      .where(eq(TB_permission.id, id))
      .returning();
  }

  deletePermission(id: Permission['id']) {
    return db.delete(TB_permission).where(eq(TB_permission.id, id));
  }

  getByID(id: Permission['id']) {
    return db.select().from(TB_permission).where(eq(TB_permission.id, id));
  }

}

export const permissionService = new PermissionService();
