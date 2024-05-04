import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { APP_SETTINGS } from '../shared/app-settings';

// or
const pool = new Pool({
  host: APP_SETTINGS.DB_HOST,
  port: APP_SETTINGS.DB_PORT,
  user: APP_SETTINGS.DB_USERNAME,
  password: APP_SETTINGS.DB_PASSWORD,
  database: APP_SETTINGS.DB_NAME,
});

export const db = drizzle(pool, {logger: true});
