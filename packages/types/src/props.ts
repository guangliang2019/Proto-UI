// packages/types/src/props.ts
export type PropsBaseType = Record<string, any>;

export type PropKind = 'any' | 'boolean' | 'string' | 'number' | 'object';
export type EmptyBehavior = 'fallback' | 'accept' | 'error';

export type PropSpec = {
  kind: PropKind;
  empty?: EmptyBehavior;

  enum?: readonly (string | number | boolean)[];
  range?: { min?: number; max?: number };
  validator?: (v: any) => boolean;
  default?: any;
};

// “可赋值”判断（不分发）
type Extends<A, B> = [A] extends [B] ? true : false;

// 是否包含 null
type HasNull<V> = Extends<null, V>;

// 对于一个值类型 V，允许哪些 kind？（v0 简化）
// - boolean -> kind: "boolean" | "any"
// - string  -> kind: "string"  | "any"
// - number  -> kind: "number"  | "any"
// - object  -> kind: "object"  | "any"
// - 其他    -> kind: "any"
type AllowedKindsFor<V> = V extends boolean
  ? 'boolean' | 'any'
  : V extends string
    ? 'string' | 'any'
    : V extends number
      ? 'number' | 'any'
      : V extends object
        ? 'object' | 'any'
        : 'any';

// 对于某个具体 kind K，在值类型 V 下允许的 empty 选项：
// - empty:"accept" 只有当 V 含 null 时才允许
type AllowedEmptyFor<V> =
  HasNull<V> extends true
    ? EmptyBehavior // accept/fallback/error 都允许
    : Exclude<EmptyBehavior, 'accept'>;

// 构造一个 Spec shape：固定 kind，并把 empty 限制住
type SpecShape<K extends PropKind, V> = Omit<PropSpec, 'kind' | 'empty'> & {
  kind: K;
  empty?: AllowedEmptyFor<V>;
};

// 最终：对某个值类型 V，允许的 spec（联合）
export type SpecForValue<V> = {
  [K in AllowedKindsFor<V>]: SpecShape<K, V>;
}[AllowedKindsFor<V>];

export type PropsSpecMap<P extends Record<string, any>> = {
  [K in keyof P & string]-?: SpecForValue<P[K]>;
};
