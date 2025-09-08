import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, apiKey } from "better-auth/plugins";
import * as Schema from "../../db/schema.js";
import db from "../../db/index.js";
import getConfig from "./config.js";

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: Schema
  }),
  baseUrl: getConfig("betterAuthUrl"),
  trustedOrigins: getConfig("origins") as [],
  plugins: [
    apiKey(),
    admin()
  ]
})

export default auth;