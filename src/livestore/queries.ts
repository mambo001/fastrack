import { queryDb, sql } from "@livestore/livestore";

import { tables } from "./schema.ts";

export const sessions$ = queryDb(tables.sessions.orderBy("startedAt", "desc"), {
  label: "sessions",
});

export const lastActiveSession$ = queryDb(
  tables.sessions
    .select()
    .where({ endedAt: null })
    .orderBy("startedAt", "asc")
    .limit(1),
);
