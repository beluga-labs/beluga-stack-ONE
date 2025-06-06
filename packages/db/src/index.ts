import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';
import { getDatabaseUrl, isProduction } from '@beluga/utils/env';

const { Pool } = pg;

const pool = new Pool({
    connectionString: getDatabaseUrl(),
    ssl: isProduction() ? { rejectUnauthorized: false } : false
});

export const db = drizzle(pool, { schema });

export * from './queries';
export * from './schema';
