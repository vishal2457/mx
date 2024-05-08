import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { APP_SETTINGS } from '../shared/app-settings';
import { logger } from '../shared/logger/logger';
import {
  TB_customer,
  TB_customerFcm,
  TB_user,
} from '../../../../libs/mx-schema/src';

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
      `Environment:${APP_SETTINGS.NODE_ENV} DB:${APP_SETTINGS.DB_NAME} Status:connected`
    );
  } catch (error) {
    logger.error(`Error: connecting ${APP_SETTINGS} DB, ${error.stack}`);
  }
};

export const db = drizzle(pool, {
  logger: true,
  schema: { TB_user, TB_customer, TB_customerFcm },
});
