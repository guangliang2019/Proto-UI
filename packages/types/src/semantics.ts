/**
 * Make T maybe nullable
 * Proto UI use null to represent empty value, undefined is not allowed
 */
export type Maybe<T> = Exclude<T, undefined> | null;

/**
 * Convert T to Maybe<T>
 */
export type ToMaybe<T> = [T] extends [undefined]
  ? null
  : undefined extends T
    ? Exclude<T, undefined> | null
    : T;

/**
 * Convert undefined in T to null (shallow)
 */
export type NullifyUndefined<T> = {
  [K in keyof T]: undefined extends T[K] ? Exclude<T[K], undefined> | null : T[K];
};

/**
 * Ensure all keys of P are string
 * Proto UI use string keys for props,
 */
export type EnsureStringKeys<P> = Exclude<keyof P, string> extends never ? P : never;
