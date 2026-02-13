// packages/modules/rule/src/when-builder.ts
import type { RuleDep, WhenBuilder, WhenExpr, WhenLiteral, WhenSignal } from './types';

function stateIdOf(s: any): string {
  const id = s?.__stateId ?? s?.id ?? s;
  if (typeof id === 'string' || typeof id === 'number') return String(id);
  return `obj:${String(id)}`;
}

export function createWhenBuilder<Props extends {}>(opts?: {
  onStateHandle?: (id: any, handle: any) => void;
}) {
  const deps: RuleDep<Props>[] = [];
  const depKeySet = new Set<string>();

  const pushDep = (d: RuleDep<Props>) => {
    const key =
      d.kind === 'prop'
        ? `prop:${String(d.key)}`
        : d.kind === 'state'
          ? `state:${stateIdOf(d.id)}`
          : `context:${String(d.key)}`;

    if (depKeySet.has(key)) return;
    depKeySet.add(key);
    deps.push(d);
  };

  const makeSignal = (left: any): WhenSignal<Props, any> => ({
    eq(lit: WhenLiteral): WhenExpr<Props> {
      return { type: 'eq', left, right: lit } as any;
    },
  });

  const w: WhenBuilder<Props> = {
    prop(key) {
      pushDep({ kind: 'prop', key });
      return makeSignal({ type: 'prop', key });
    },
    state(s: any) {
      const id = s?.__stateId ?? s?.id ?? s;
      pushDep({ kind: 'state', id });
      if (opts?.onStateHandle) opts.onStateHandle(id, s);
      return makeSignal({ type: 'state', id });
    },
    ctx(key: any) {
      pushDep({ kind: 'context', key });
      return makeSignal({ type: 'context', key });
    },

    all(...exprs: WhenExpr<Props>[]): WhenExpr<Props> {
      return { type: 'all', exprs } as any;
    },
    any(...exprs: WhenExpr<Props>[]): WhenExpr<Props> {
      return { type: 'any', exprs } as any;
    },
    not(expr: WhenExpr<Props>): WhenExpr<Props> {
      return { type: 'not', expr } as any;
    },

    t(): WhenExpr<Props> {
      return { type: 'true' } as any;
    },
    f(): WhenExpr<Props> {
      return { type: 'false' } as any;
    },
  };

  return {
    w,
    getDeps: () => deps.slice(),
  };
}
