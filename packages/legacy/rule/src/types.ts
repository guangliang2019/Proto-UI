// packages/legacy/rule/src/types.ts
import type { StyleHandle } from '@proto-ui/core';

export type RuleDep<Props> =
  | { kind: 'prop'; key: keyof Props }
  | { kind: 'state'; id: any }
  | { kind: 'context'; key: any }
  | { kind: 'event'; type: string };

export type WhenLiteral = string | number | boolean | null;

export type WhenValue<Props> =
  | { type: 'prop'; key: keyof Props }
  | { type: 'state'; id: any }
  | { type: 'context'; key: any };

export type WhenExpr<Props> =
  | { type: 'true' }
  | { type: 'false' }
  | { type: 'eq'; left: WhenValue<Props>; right: WhenLiteral }
  | { type: 'not'; expr: WhenExpr<Props> }
  | { type: 'all'; exprs: WhenExpr<Props>[] }
  | { type: 'any'; exprs: WhenExpr<Props>[] }
  | { type: 'happens'; eventType: string };

export interface WhenSignal<Props, T> {
  eq(lit: WhenLiteral): WhenExpr<Props>;
}

export interface WhenEventSignal<Props> {
  happens(): WhenExpr<Props>;
}

export interface WhenBuilder<Props extends {}> {
  prop<K extends keyof Props>(key: K): WhenSignal<Props, Props[K]>;
  state(_s: any): WhenSignal<Props, any>;
  ctx<T>(_key: any): WhenSignal<Props, T>;

  event(type: string): WhenEventSignal<Props>;

  all(...exprs: WhenExpr<Props>[]): WhenExpr<Props>;
  any(...exprs: WhenExpr<Props>[]): WhenExpr<Props>;
  not(expr: WhenExpr<Props>): WhenExpr<Props>;

  t(): WhenExpr<Props>;
  f(): WhenExpr<Props>;
}

export type RuleOp = { kind: 'feedback.style.use'; handles: StyleHandle[] };

export type RuleIntent = { kind: 'ops'; ops: RuleOp[] };

export type RuleIR<Props extends {}> = {
  label?: string;
  note?: string;
  priority?: number;

  deps: RuleDep<Props>[];
  when: WhenExpr<Props>;
  intent: RuleIntent;
};

export type RuleSpec<Props extends {}> = {
  label?: string;
  note?: string;
  priority?: number;
  when: (w: WhenBuilder<Props>) => WhenExpr<Props>;
  intent: (i: IntentBuilder) => void;
};

export interface IntentBuilder {
  feedback: {
    style: {
      use(...handles: StyleHandle[]): void;
    };
  };
}

export type RulePlanV0 = {
  kind: 'style.tokens';
  tokens: string[];
};
