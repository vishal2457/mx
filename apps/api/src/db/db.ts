import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  TB_customer,
  TB_customer_offer,
  TB_customerFcm,
  TB_match,
  TB_menu,
  TB_notification,
  TB_offer,
  TB_role,
  TB_user,
} from '../../../../libs/mx-schema/src';
import { APP_SETTINGS } from '../shared/app-settings';
import { logger } from '../shared/logger/logger';
import { seedMenu } from './seed/menu';
import { hashPassword } from '../shared/password-hash';

// or
const pool = new Pool({
  host: APP_SETTINGS.DB_HOST,
  port: APP_SETTINGS.DB_PORT,
  user: APP_SETTINGS.DB_USERNAME,
  password: APP_SETTINGS.DB_PASSWORD,
  database: APP_SETTINGS.DB_NAME,
});

export const checkDbConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    logger.info(
      `Environment:${APP_SETTINGS.NODE_ENV} DB:${APP_SETTINGS.DB_NAME} connected`
    );
  } catch (error) {
    logger.error(
      `Error: connecting ${APP_SETTINGS.DB_NAME} DB, ${error.stack}`
    );
  }
};

export const db = drizzle(pool, {
  logger: true,
  schema: {
    TB_user,
    TB_customer,
    TB_customerFcm,
    TB_menu,
    TB_match,
    TB_notification,
    TB_role,
    TB_offer,
    TB_customer_offer,
  },
});

async function seed() {
  await db.delete(TB_menu);
  await db.insert(TB_menu).values(seedMenu);
  await db.delete(TB_user);
  await db
    .insert(TB_user)
    .values([{ email: 'test@test.com', password: hashPassword('123') }]);
}
// seed();
