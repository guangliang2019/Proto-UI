// packages/core/src/caps/token.ts
export type CapToken<T> = {
  /** globally unique id, MUST be namespaced */
  readonly id: string;

  /** type brand; never read at runtime */
  readonly __type?: T;
};

export function cap<T>(id: string): CapToken<T> {
  // runtime identity is the string id; token object is lightweight
  return { id } as CapToken<T>;
}

/** type helper */
export type CapValue<T extends CapToken<any>> = T extends CapToken<infer V> ? V : never;
