import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
dotenv.config({ path: `${process.cwd()}/.env` });

import { Pool } from 'pg';
import {
  TB_bodyPart,
  TB_exercise,
  TB_menu,
  TB_organisation,
  TB_user,
} from '../../../../../libs/mx-schema/src';
import { seedMenu } from './menu';
import { exerciseData } from './exersice';
import { sql } from 'drizzle-orm';
import { bodyPartsData } from './body-parts';
import { hashPassword } from '../../shared/password-hash';

const pool = new Pool({
  host: process.env.NODE_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'fitflow',
});

async function seed() {
  const db = drizzle(pool, {
    logger: true,
  });

  await db
    .insert(TB_organisation)
    .values({ name: 'test', email: 'test@test.com' });
  await db.insert(TB_user).values({
    name: 'Admin',
    email: 'test@test.com',
    password: hashPassword('123'),
    organisationID: 1,
  });

  await db.delete(TB_exercise);
  await db
    .insert(TB_exercise)
    .values(exerciseData)
    .onConflictDoUpdate({
      target: TB_exercise.id,
      set: {
        name: sql`excluded.name`,
        description: sql`excluded.description`,
        level: sql`excluded.level`,
      },
    });

  await db.delete(TB_bodyPart);
  await db
    .insert(TB_bodyPart)
    .values(bodyPartsData)
    .onConflictDoUpdate({
      target: TB_bodyPart.id,
      set: {
        name: sql`excluded.name`,
        description: sql`excluded.description`,
      },
    });

  process.exit(0);
}

seed();
