import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  bigint,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

export const example = pgTable("example", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: text("id"),
  age: integer("age"),
  massive: bigint({ mode: "number" }),
  married: boolean("married"),
  createdAt: timestamp("created_at"),
  config: jsonb("config")
})

export const exampleInsertSchema = createInsertSchema(example);