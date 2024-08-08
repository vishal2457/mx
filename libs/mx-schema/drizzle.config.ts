import type { Config } from 'drizzle-kit';
export default {
  schema: './libs/mx-schema/src/lib/**/*.schema.ts',
  out: './apps/api/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.NODE_HOST}:${process.env.DB_PORT}/fitflow`,
  },
} satisfies Config;
