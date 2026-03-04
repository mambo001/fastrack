import {
  Events,
  makeSchema,
  Schema,
  SessionIdSymbol,
  State,
} from "@livestore/livestore";

// You can model your state as SQLite tables (https://docs.livestore.dev/reference/state/sqlite-schema)
export const tables = {
  sessions: State.SQLite.table({
    name: "sessions",
    columns: {
      id: State.SQLite.text({ primaryKey: true }),
      window: State.SQLite.text({
        default: "",
      }),
      startedAt: State.SQLite.integer({
        nullable: true,
        schema: Schema.DateFromNumber,
      }),
      endedAt: State.SQLite.integer({
        nullable: true,
        schema: Schema.DateFromNumber,
      }),
    },
  }),

  // // Client documents can be used for local-only state (e.g. form inputs)
  // uiState: State.SQLite.clientDocument({
  //   name: 'uiState',
  //   schema: Schema.Struct({ newTodoText: Schema.String, filter: Schema.Literal('all', 'active', 'completed') }),
  //   default: { id: SessionIdSymbol, value: { newTodoText: '', filter: 'all' } },
  // }),
};

// Events describe data changes (https://docs.livestore.dev/reference/events)
export const events = {
  // todoCreated: Events.synced({
  //   name: 'v1.TodoCreated',
  //   schema: Schema.Struct({ id: Schema.String, text: Schema.String }),
  // }),
  // todoCompleted: Events.synced({
  //   name: 'v1.TodoCompleted',
  //   schema: Schema.Struct({ id: Schema.String }),
  // }),
  // todoUncompleted: Events.synced({
  //   name: 'v1.TodoUncompleted',
  //   schema: Schema.Struct({ id: Schema.String }),
  // }),
  // todoDeleted: Events.synced({
  //   name: 'v1.TodoDeleted',
  //   schema: Schema.Struct({ id: Schema.String, deletedAt: Schema.Date }),
  // }),
  // todoClearedCompleted: Events.synced({
  //   name: 'v1.TodoClearedCompleted',
  //   schema: Schema.Struct({ deletedAt: Schema.Date }),
  // }),
  // uiStateSet: tables.uiState.set,

  sessionStarted: Events.synced({
    name: "v1.SessionStarted",
    schema: Schema.Struct({
      id: Schema.String,
      startedAt: Schema.Date,
      window: Schema.String,
    }),
  }),
  sessionEnded: Events.synced({
    name: "v1.SessionEnded",
    schema: Schema.Struct({ id: Schema.String, endedAt: Schema.Date }),
  }),
};

// Materializers are used to map events to state (https://docs.livestore.dev/reference/state/materializers)
const materializers = State.SQLite.materializers(events, {
  // "v1.TodoCreated": ({ id, text }) =>
  //   tables.todos.insert({ id, text, completed: false }),
  // "v1.TodoCompleted": ({ id }) =>
  //   tables.todos.update({ completed: true }).where({ id }),
  // "v1.TodoUncompleted": ({ id }) =>
  //   tables.todos.update({ completed: false }).where({ id }),
  // "v1.TodoDeleted": ({ id, deletedAt }) =>
  //   tables.todos.update({ deletedAt }).where({ id }),
  // "v1.TodoClearedCompleted": ({ deletedAt }) =>
  //   tables.todos.update({ deletedAt }).where({ completed: true }),
  "v1.SessionStarted": ({ id, startedAt, window }) =>
    tables.sessions.insert({ id, startedAt, window }),
  "v1.SessionEnded": ({ id, endedAt }) =>
    tables.sessions.update({ endedAt }).where({ id }),
});

const state = State.SQLite.makeState({ tables, materializers });

export const schema = makeSchema({ events, state });

// Shared sync payload schema for this example
export const SyncPayload = Schema.Struct({ authToken: Schema.String });
