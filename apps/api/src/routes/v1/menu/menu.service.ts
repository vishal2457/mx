import { eq } from 'drizzle-orm';
import { db } from '../../../db/db';
import { TB_menu } from '../../../../../../libs/mx-schema/src';

class MenuService {
  getAllActiveMenu() {
    return db.query.TB_menu.findMany({
      where: eq(TB_menu.active, true),
    });
  }
}

export const menuService = new MenuService();
