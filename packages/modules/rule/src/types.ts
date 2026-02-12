// packages/modules/rule/src/types.ts
import type { PropsBaseType } from "@proto-ui/types";
import type {
  ModuleInstance,
  ModuleFacade,
  ModuleScope,
  StyleHandle,
  OwnedStateHandle,
  BorrowedStateHandle,
} from "@proto-ui/core";

export type RuleDep<Props> =
  | { kind: "prop"; key: keyof Props }
  | { kind: "state"; id: any }
  | { kind: "context"; key: any };

export type WhenLiteral = string | number | boolean | null;

export type WhenValue<Props> =
  | { type: "prop"; key: keyof Props }
  | { type: "state"; id: any }
  | { type: "context"; key: any };

export type WhenExpr<Props> =
  | { type: "true" }
  | { type: "false" }
  | { type: "eq"; left: WhenValue<Props>; right: WhenLiteral }
  | { type: "not"; expr: WhenExpr<Props> }
  | { type: "all"; exprs: WhenExpr<Props>[] }
  | { type: "any"; exprs: WhenExpr<Props>[] };

export interface WhenSignal<Props, T> {
  eq(lit: WhenLiteral): WhenExpr<Props>;
}

export interface WhenBuilder<Props extends {}> {
  prop<K extends keyof Props>(key: K): WhenSignal<Props, Props[K]>;
  state(_s: any): WhenSignal<Props, any>;
  ctx<T>(_key: any): WhenSignal<Props, T>;

  all(...exprs: WhenExpr<Props>[]): WhenExpr<Props>;
  any(...exprs: WhenExpr<Props>[]): WhenExpr<Props>;
  not(expr: WhenExpr<Props>): WhenExpr<Props>;

  t(): WhenExpr<Props>;
  f(): WhenExpr<Props>;
}

export type RuleOp =
  | { kind: "feedback.style.use"; handles: StyleHandle[] }
  | {
      kind: "state.set";
      handle: OwnedStateHandle<any> | BorrowedStateHandle<any, any>;
      value: any;
      reason?: any;
    };

export type RuleIntent = { kind: "ops"; ops: RuleOp[] };

export type RuleIR<Props extends {}> = {
  id: number;
  label?: string;
  note?: string;

  deps: RuleDep<Props>[];
  when: WhenExpr<Props>;
  intent: RuleIntent;
};

export type RuleSpec<Props extends {}> = {
  label?: string;
  note?: string;
  when: (w: WhenBuilder<Props>) => WhenExpr<Props>;
  intent: (i: IntentBuilder) => void;
};

export interface StateIntentBuilder<T> {
  be(value: T): void;
}

export interface IntentBuilder {
  feedback: {
    style: {
      use(...handles: StyleHandle[]): void;
    };
  };
  state: <T>(
    handle: OwnedStateHandle<T> | BorrowedStateHandle<T, PropsBaseType>
  ) => StateIntentBuilder<T>;
}

export type RulePlanV0 = {
  kind: "style.tokens";
  tokens: string[];
};

export type RuleEvalCtx<Props extends {}> = {
  props: Readonly<Props>;
  readState?: (id: any) => any;
  readContext?: (key: any, path?: string[]) => any;
};

export type RuleEvalResult =
  | { kind: "plan"; plan: RulePlanV0 }
  | { kind: "short-circuit"; executed: boolean };

export type RuleExtension<Props extends {}> = {
  transformRules?: (
    rules: RuleIR<Props>[],
    ctx: RuleEvalCtx<Props>
  ) => RuleIR<Props>[];
  beforePlan?: (ctx: RuleEvalCtx<Props>) =>
    | { kind: "continue" }
    | { kind: "short-circuit"; execute?: (ctx: RuleEvalCtx<Props>) => void };
  afterPlan?: (plan: RulePlanV0, ctx: RuleEvalCtx<Props>) => RulePlanV0;
};

export type RulePort<Props extends {}> = {
  exportIR(): RuleIR<Props>[];
  resolveStateHandle(id: any): { get(): any } | undefined;
  evaluate(ctx: RuleEvalCtx<Props>): RuleEvalResult;
  registerExtension(ext: RuleExtension<Props>): void;
};

export type RuleFacade<Props extends {}> = ModuleFacade & {
  // setup-only: def.rule
  rule: (spec: RuleSpec<Props>) => void;
};

export type RuleModule<Props extends {}> = ModuleInstance<RuleFacade<Props>> & {
  name: "rule";
  scope: ModuleScope; // normally "instance"
  port: RulePort<Props>;
};
