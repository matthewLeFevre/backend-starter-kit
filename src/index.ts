import { serve } from "@hono/node-server"
import { Hono } from "hono";
import { cors } from "hono/cors";
import 'dotenv/config';
import getConfig from "./lib/utilities/config.js";
import auth from "./lib/utilities/auth.js";
import type { DB } from "./db/index.js";
import { S3Client } from '@aws-sdk/client-s3';
import db from "./db/index.js";
import exampleService from "./services/example/index.js";

export type HonoContext = {
  Variables: {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  },
  Bindings: {
    db: DB,
    s3: S3Client
  }
}

const app = new Hono<HonoContext>();

app.use(async (c, next) => {
  if (!c.env.db) {
    c.env.db = db;
  }
  c.env.s3 = new S3Client({
    region: getConfig("awsRegion").toString(),
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
  })
})

app.use("*", cors({
  origin: getConfig('origins') as [],
  allowHeaders: getConfig("httpHeaders") as [],
  allowMethods: getConfig('httpMethods') as [],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true
}))

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return next();
  }

  c.set("user", <typeof auth.$Infer.Session.user>session.user);
  c.set("session", session.session);
  return next();
});

// Put things that don't require
// auth before the better auth
// middleware
app.get('/api', async (c) => {
  return c.text('Hello Hono!')
})

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.route('/api/example', exampleService);



serve({
  fetch: app.fetch,
  port: +getConfig('port'),
  hostname: '0.0.0.0'
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
})