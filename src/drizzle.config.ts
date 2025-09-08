import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const { DB_HOST, DB_USER, DB_NAME, DB_PASS, DB_PORT, DB_EXTRA } = process.env;
const url = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}${DB_EXTRA}`
console.log(url);
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url
  }
});
