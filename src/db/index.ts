import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from 'pg';
const {
  DB_HOST,
  DB_USER,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_EXTRA
} = process.env;
const url = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}${DB_EXTRA}`
const poolConfig: any = {
  connectionString: url
};
if (process.env.PGSSLMODE === 'allow') {
  poolConfig.ssl = {
    rejectUnauthorized: false
  }
}
const pool = new Pool(poolConfig)
const db = drizzle(pool);
export type DB = typeof db;
export default db;