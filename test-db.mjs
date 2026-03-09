import pg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

async function test(connStr, name) {
    const client = new Client({
        connectionString: connStr,
        connectionTimeoutMillis: 10000,
        ssl: { rejectUnauthorized: false }
    });
    try {
        await client.connect();
        const res = await client.query("SELECT current_database()");
        const tables = await client.query("SELECT count(*) as n FROM information_schema.tables WHERE table_schema='public'");
        console.log(`OK ${name} — DB: ${res.rows[0].current_database}, Tables: ${tables.rows[0].n}`);
        await client.end();
    } catch (e) {
        console.log(`FAILED ${name}: ${e.message}`);
    }
}

// Session Pooler = same host as pooler but port 5432 (supports DDL)
const SESSION = 'postgresql://postgres.xwsokdkalabasnarrmkj:_wbAS4a8tb7$Qzj@aws-1-ap-south-1.pooler.supabase.com:5432/postgres';
const POOLER = process.env.DATABASE_URL;

console.log('---');
await test(SESSION, 'SESSION POOLER (5432 via pooler host)');
await test(POOLER, 'TRANSACTION POOLER (6543)');
