import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  TB_customer,
  TB_customerFcm,
  TB_member,
  TB_memberAttendance,
  TB_menu,
  TB_notification,
  TB_organisation,
  TB_permission,
  TB_plan,
  TB_role,
  TB_rolePermission,
  TB_user,
  TB_memberPlan,
} from '../../../../libs/mx-schema/src';
import { APP_SETTINGS } from '../shared/app-settings';
import { logger } from '../shared/logger/logger';

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
      `Environment:${APP_SETTINGS.NODE_ENV} DB:${APP_SETTINGS.DB_NAME} connected`,
    );
  } catch (error) {
    logger.error(
      `Error: connecting ${APP_SETTINGS.DB_NAME} DB, ${error.stack}`,
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
    TB_notification,
    TB_role,
    TB_memberAttendance,
    TB_member,
    TB_organisation,
    TB_permission,
    TB_plan,
    TB_rolePermission,
    TB_memberPlan,
    // ADD NEW DB SCHEMA
  },
});
