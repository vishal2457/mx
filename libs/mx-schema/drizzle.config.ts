import type { Config } from 'drizzle-kit';
export default {
  schema: './libs/mx-schema/src/lib/**/*.schema.ts',
  out: './apps/api/drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: `postgresql://root:root@localhost:5432/maximus`,
  },
} satisfies Config;
