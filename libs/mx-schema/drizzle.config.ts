import type { Config } from 'drizzle-kit';
export default {
  schema: './libs/mx-schema/src/lib/**/*.schema.ts',
  out: './apps/api/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgresql://root:root@localhost:5432/maximus`,
  },
} satisfies Config;
