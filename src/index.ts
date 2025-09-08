import { serve } from "@hono/node-server"
import { Hono } from "hono";
import { cors } from "hono/cors";
import 'dotenv/config';
import getConfig from "./lib/utilities/config.js";


const app = new Hono();

app.use("*", cors({
  origin: getConfig('origins') as [],
  allowHeaders: getConfig("httpHeaders") as [],
  allowMethods: getConfig('httpMethods') as [],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true
}))

serve({
  fetch: app.fetch,
  port: +getConfig('port'),
  hostname: '0.0.0.0'
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
})