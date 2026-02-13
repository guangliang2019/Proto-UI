// packages/types/src/context.ts
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [k: string]: JsonValue };
export type JsonObject = { [k: string]: JsonValue };

export type ContextKey<T extends JsonObject = JsonObject> = {
  readonly __brand: 'ContextKey';
  readonly debugName: string;
};
