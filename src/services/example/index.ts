import { Hono } from "hono";
import type { HonoContext } from "../../index.js";

const exampleService = new Hono<HonoContext>();

export default exampleService;