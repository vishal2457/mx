import { eq } from 'drizzle-orm';
import { Request } from 'express';
import { TB_role } from '../../../../../../libs/mx-schema/src';
import { db } from '../../../db/db';
import { getTotalCount } from '../../../db/utils-db/pg/count-rows';
import { getListQueryWithFilters } from '../../../db/utils-db/pg/list-filters/list-filters';

type Role = typeof TB_role.$inferSelect;

class RoleService {
  getRoleList(query: Request['query']) {
    return getListQueryWithFilters(TB_role, query);
  }

  getAllRoles() {
    return db.select().from(TB_role);
  }

  getTotalCount() {
    return getTotalCount(TB_role);
  }

  createRole(payload: typeof TB_role.$inferInsert) {
    return db.insert(TB_role).values(payload).returning();
  }

  updateRole(payload: typeof TB_role.$inferInsert, id: Role['id']) {
    return db
      .update(TB_role)
      .set(payload)
      .where(eq(TB_role.id, id))
      .returning();
  }

  deleteRole(id: Role['id']) {
    return db.delete(TB_role).where(eq(TB_role.id, id));
  }

  getByID(id: Role['id']) {
    return db.select().from(TB_role).where(eq(TB_role.id, id));
  }
}

export const roleService = new RoleService();
