// packages/legacy/rule/src/when-builder.ts
import type {
  RuleDep,
  WhenBuilder,
  WhenExpr,
  WhenLiteral,
  WhenSignal,
  WhenEventSignal,
} from "./types";

export function createWhenBuilder<Props extends {}>() {
  const deps: RuleDep<Props>[] = [];
  const depKeySet = new Set<string>();

  const pushDep = (d: RuleDep<Props>) => {
    // stable + de-duplicated: first-seen order
    const key =
      d.kind === "prop"
        ? `prop:${String(d.key)}`
        : d.kind === "event"
        ? `event:${d.type}`
        : d.kind === "state"
        ? `state:${String(d.id)}`
        : `context:${String(d.key)}`;

    if (depKeySet.has(key)) return;
    depKeySet.add(key);
    deps.push(d);
  };

  const makeSignal = (left: any): WhenSignal<Props, any> => ({
    eq(lit: WhenLiteral): WhenExpr<Props> {
      return { type: "eq", left, right: lit } as any;
    },
  });

  const w: WhenBuilder<Props> = {
    prop(key) {
      pushDep({ kind: "prop", key });
      return makeSignal({ type: "prop", key });
    },
    state(s: any) {
      // v0: treat as opaque; deps still recorded
      const id = s?.id ?? s;
      pushDep({ kind: "state", id });
      return makeSignal({ type: "state", id });
    },
    ctx(key: any) {
      pushDep({ kind: "context", key });
      return makeSignal({ type: "context", key });
    },
    event(type: string): WhenEventSignal<Props> {
      pushDep({ kind: "event", type });
      return {
        happens() {
          return { type: "happens", eventType: type } as any;
        },
      };
    },

    all(...exprs: WhenExpr<Props>[]): WhenExpr<Props> {
      return { type: "all", exprs } as any;
    },
    any(...exprs: WhenExpr<Props>[]): WhenExpr<Props> {
      return { type: "any", exprs } as any;
    },
    not(expr: WhenExpr<Props>): WhenExpr<Props> {
      return { type: "not", expr } as any;
    },

    t(): WhenExpr<Props> {
      return { type: "true" } as any;
    },
    f(): WhenExpr<Props> {
      return { type: "false" } as any;
    },
  };

  return {
    w,
    getDeps: () => deps.slice(),
  };
}
