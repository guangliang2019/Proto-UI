// packages/runtime/src/orchestrator/module-orchestrator/graph.ts
import type { ModuleDef } from '@proto-ui/modules.base';

export type ModuleDepsSpec = {
  hard: Set<string>;
  optional: Set<string>;
};

export type ModuleGraph = {
  order: ModuleDef[];
  byName: Map<string, ModuleDef>;
  depsByName: Map<string, ModuleDepsSpec>;
};

export function buildModuleGraph(prototypeName: string, modules: ModuleDef[]): ModuleGraph {
  // unique name check
  const seen = new Set<string>();
  for (const m of modules) {
    if (seen.has(m.name)) {
      throw new Error(`[Runtime] duplicate module name: ${prototypeName}/${m.name}`);
    }
    seen.add(m.name);
  }

  const byName = new Map<string, ModuleDef>();
  const depsByName = new Map<string, ModuleDepsSpec>();

  for (const m of modules) {
    byName.set(m.name, m);
    depsByName.set(m.name, {
      hard: new Set(m.deps ?? []),
      optional: new Set(m.optionalDeps ?? []),
    });
  }

  const hardDeps = (m: ModuleDef) => m.deps ?? [];
  const optDeps = (m: ModuleDef) => m.optionalDeps ?? [];

  // validate hard deps existence
  for (const m of modules) {
    for (const d of hardDeps(m)) {
      if (!byName.has(d)) {
        throw new Error(
          `[Runtime] missing module dependency: ${prototypeName}/${m.name} deps -> ${d}`
        );
      }
    }
  }

  // Build graph edges: dep -> m
  const indeg = new Map<string, number>();
  const out = new Map<string, string[]>();

  for (const m of modules) {
    indeg.set(m.name, 0);
    out.set(m.name, []);
  }

  const addEdge = (from: string, to: string) => {
    out.get(from)!.push(to);
    indeg.set(to, (indeg.get(to) ?? 0) + 1);
  };

  for (const m of modules) {
    for (const d of hardDeps(m)) addEdge(d, m.name);
    for (const d of optDeps(m)) {
      if (byName.has(d)) addEdge(d, m.name);
    }
  }

  // Kahn topo sort
  const q: string[] = [];
  for (const [name, v] of indeg) if (v === 0) q.push(name);

  const order: string[] = [];
  while (q.length) {
    const cur = q.shift()!;
    order.push(cur);
    for (const nxt of out.get(cur)!) {
      const v = (indeg.get(nxt) ?? 0) - 1;
      indeg.set(nxt, v);
      if (v === 0) q.push(nxt);
    }
  }

  if (order.length !== modules.length) {
    // find cycle-ish remainder for error msg
    const remains = [...indeg.entries()]
      .filter(([, v]) => v > 0)
      .map(([k]) => k)
      .join(', ');
    throw new Error(`[Runtime] module dependency cycle: ${prototypeName} remains=[${remains}]`);
  }

  return { order: order.map((n) => byName.get(n)!), byName, depsByName };
}
