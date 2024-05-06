import type { Config } from 'drizzle-kit';
export default {
  schema: './apps/api/src/db/schema/**/*.schema.ts',
  out: './apps/api/drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: `postgresql://root:root@localhost:5432/maximus`,
  },
} satisfies Config;
