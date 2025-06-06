import { getDatabaseUrl } from '@beluga/utils/env';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    out: './src/drizzle',
    schema: './src/schema/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: getDatabaseUrl()
    },
    strict: false
});
