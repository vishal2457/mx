import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_rolePermission } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type RolePermission = typeof TB_rolePermission.$inferSelect;


class RolePermissionService {
  getRolePermissionList(query: Request['query']) {
    return getListQueryWithFilters(TB_rolePermission, query);
  }

  getAllRolePermissions() {
    return db.select().from(TB_rolePermission);
  }

  getTotalCount() {
    return getTotalCount(TB_rolePermission);
  }

  createRolePermission(payload: typeof TB_rolePermission.$inferInsert) {
    return db.insert(TB_rolePermission).values(payload).returning();
  }

  updateRolePermission(payload: typeof TB_rolePermission.$inferInsert, id: RolePermission['id']) {
    return db
      .update(TB_rolePermission)
      .set(payload)
      .where(eq(TB_rolePermission.id, id))
      .returning();
  }

  deleteRolePermission(id: RolePermission['id']) {
    return db.delete(TB_rolePermission).where(eq(TB_rolePermission.id, id));
  }

  getByID(id: RolePermission['id']) {
    return db.select().from(TB_rolePermission).where(eq(TB_rolePermission.id, id));
  }

}

export const rolePermissionService = new RolePermissionService();
