import { Schema } from "effect";

export const Filter = Schema.Literal("all", "active", "completed");
export type Filter = typeof Filter.Type;

export const FastingWindow = Schema.Literal(16, 18, 20, 24, 36, 48, 72);
export type FastingWindow = typeof FastingWindow.Type;

export interface Session {
  readonly id: string;
  readonly window: string;
  readonly startedAt: Date | null;
  readonly endedAt: Date | null;
}