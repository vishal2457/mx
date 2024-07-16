import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
dotenv.config({ path: `${process.cwd()}/.env` });

import { Pool } from 'pg';
import {
  TB_menu,
  TB_organisation,
  TB_user,
} from '../../../../../libs/mx-schema/src';
import { hashPassword } from '../../shared/password-hash';
import { seedMenu } from './menu';

const pool = new Pool({
  host: process.env.NODE_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'maximus',
});

async function seed() {
  const db = drizzle(pool, {
    logger: true,
  });

  await db.delete(TB_menu);
  await db.insert(TB_menu).values(seedMenu);

  // await db
  //   .insert(TB_organisation)
  //   .values({ name: 'test', email: 'test@test.com' });
  // await db.insert(TB_user).values({
  //   name: 'Admin',
  //   email: 'test@test.com',
  //   password: hashPassword('123'),
  //   organisationID: 1,
  // });

  process.exit(0);
}

seed();
