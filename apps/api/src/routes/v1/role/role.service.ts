import { and, eq } from 'drizzle-orm';
import { Request } from 'express';
import {
  TB_role,
  TB_rolePermission,
  TB_userRole,
} from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Role = typeof TB_role.$inferSelect;
type UserRole = typeof TB_userRole.$inferSelect;

class RoleService {
  getRoleList(query: Request['query'], organisationID: Role['organisationID']) {
    return getListQueryWithFilters(TB_role, query, [
      eq(TB_role.organisationID, organisationID),
    ]);
  }

  getAllRoles() {
    return db.select().from(TB_role);
  }

  getTotalCount() {
    return getTotalCount(TB_role);
  }

  createRole(payload: typeof TB_role.$inferInsert, tx?: typeof db) {
    const ex = tx || db;
    return ex.insert(TB_role).values(payload).returning();
  }

  updateRole(payload: typeof TB_role.$inferInsert, id: Role['id'], tx?: any) {
    const ex = tx || db;
    return ex
      .update(TB_role)
      .set(payload)
      .where(eq(TB_role.id, id))
      .returning();
  }

  deleteRole(id: Role['id']) {
    return db.delete(TB_role).where(eq(TB_role.id, id));
  }

  getByID(id: Role['id']) {
    return db
      .select()
      .from(TB_role)
      .leftJoin(TB_rolePermission, eq(TB_role.id, TB_rolePermission.roleID))
      .where(eq(TB_role.id, id));
  }

  getRolePermissionByUserID(userID: UserRole['userID']) {
    return db
      .select()
      .from(TB_rolePermission)
      .leftJoin(TB_role, eq(TB_rolePermission.roleID, TB_role.id))
      .leftJoin(TB_userRole, eq(TB_role.id, TB_userRole.roleID))
      .where(eq(TB_userRole.userID, userID));
  }

  createRolePermission(
    payload: Array<typeof TB_rolePermission.$inferInsert>,
    tx?: typeof db,
  ) {
    const ex = tx || db;
    return ex.insert(TB_rolePermission).values(payload);
  }

  deleteRolePermission(
    roleID: (typeof TB_rolePermission.$inferSelect)['id'],
    tx?: any,
  ) {
    const ex = tx || db;
    return ex
      .delete(TB_rolePermission)
      .where(eq(TB_rolePermission.roleID, roleID));
  }
}

export const roleService = new RoleService();
