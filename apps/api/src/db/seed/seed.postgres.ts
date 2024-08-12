import * as dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.NODE_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'fitflow',
});

async function seed() {
  // const db = drizzle(pool, {
  //   logger: true,
  // });

  // eslint-disable-next-line no-console
  console.log('No seed data configured');

  process.exit(0);
}

seed();
