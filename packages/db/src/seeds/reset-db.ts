import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import { Pool } from 'pg';
import * as schema from '../schema';
import { getDatabaseUrl } from '@beluga/utils/env';

async function main() {
    console.log('🔄 Resetting database...');

    const pool = new Pool({
        connectionString: getDatabaseUrl()
    });

    const db = drizzle(pool, { schema });

    try {
        // Drop all tables
        await db.execute(sql`
            DROP TABLE IF EXISTS "user_to_workspace" CASCADE;
            DROP TABLE IF EXISTS "workspace" CASCADE;
            DROP TABLE IF EXISTS "user" CASCADE;
        `);

        console.log('✅ Database reset complete');
    } catch (error) {
        console.error('❌ Error resetting database:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

main().catch(console.error);
