// packages/modules/props/src/impl.ts
import type {
  PropsDefaults,
  PropsSnapshot,
  WatchInfo,
  ProtoPhase,
  CapsVaultView,
} from "@proto-ui/core";
import { illegalPhase } from "@proto-ui/core";

import { ModuleBase } from "@proto-ui/modules.base";
import type { PropsBaseType, PropsSpecMap } from "@proto-ui/types";

import type {
  RawPropsSource,
  PropsWatchCb,
  RawWatchCb,
  PropsWatchTask,
} from "./types";
import { RAW_PROPS_SOURCE_CAP } from "./caps";
import { PropsKernel, type PropsChangeReport } from "./kernel/kernel";
function objectIs(a: any, b: any) {
  return Object.is(a, b);
}

function diffKeys(
  prev: Record<string, any>,
  next: Record<string, any>,
  keys: string[]
) {
  const changed: string[] = [];
  for (const k of keys) {
    if (!objectIs((prev as any)[k], (next as any)[k])) changed.push(k);
  }
  return changed;
}

/**
 * Props module impl:
 * - Kernel is pure + reusable (no watchers, no run).
 * - Impl owns subscriptions + pending change report -> watch tasks.
 * - Runtime dispatches tasks with ctx=run at callback-safe points.
 */
export class PropsModuleImpl<P extends PropsBaseType> extends ModuleBase {
  private readonly kernel = new PropsKernel<P>();

  private rawDirty = true;
  private subscribed = false;

  private unsubRaw: (() => void) | undefined;
  private lastSource: RawPropsSource<P> | undefined;

  private readonly prototypeName: string;

  private readonly declaredKeys: Set<string> = new Set();

  // watchers (setup-only registration)
  private watch: Array<{ keys: string[]; cb: PropsWatchCb<P> }> = [];
  private watchAll: Array<{ cb: PropsWatchCb<P> }> = [];
  private watchRaw: Array<{
    keys: string[];
    cb: RawWatchCb<P & PropsBaseType>;
    devWarn?: boolean;
  }> = [];
  private watchRawAll: Array<{
    cb: RawWatchCb<P & PropsBaseType>;
    devWarn?: boolean;
  }> = [];

  // pending change report (last-wins; keep first prev)
  // NOTE: do NOT name it "pending" — ModuleBase has its own pending queue.
  private pendingReport: {
    prevRaw: Readonly<P & PropsBaseType>;
    prevResolved: PropsSnapshot<P>;
    nextRaw: Readonly<P & PropsBaseType>;
    nextResolved: PropsSnapshot<P>;
  } | null = null;

  constructor(caps: CapsVaultView, prototypeName: string) {
    super(caps);
    this.prototypeName = prototypeName;
  }

  // -------------------------
  // setup-only API (guarded)
  // -------------------------

  define(decl: PropsSpecMap<P>): void {
    this.guardSetupOnly("def.props.define");
    this.kernel.define(decl);

    // keep declared keys in impl for watch validation (impl concern)
    for (const k of Object.keys(decl as any)) this.declaredKeys.add(k);
  }

  setDefaults(partialDefaults: PropsDefaults<P>): void {
    this.guardSetupOnly("def.props.setDefaults");
    this.kernel.setDefaults(partialDefaults);
  }

  watchKeys(keys: (keyof P & string)[], cb: PropsWatchCb<P>): void {
    this.guardSetupOnly("def.props.watch");
    if (!Array.isArray(keys) || keys.length === 0) {
      throw new Error(
        `[Props] watch(keys) requires non-empty declared keys. Use watchAll() instead.`
      );
    }

    // If we haven't seen any define() yet, refusing is safer than silently accepting.
    // This keeps the contract strict and avoids delayed runtime surprises.
    if (this.declaredKeys.size === 0) {
      throw new Error(
        `[Props] watch(keys) requires props to be declared first (define()).`
      );
    }

    for (const k of keys as any as string[]) {
      if (!this.declaredKeys.has(k)) {
        throw new Error(
          `[Props] watch(keys) only allows declared keys. Undeclared: ${k}`
        );
      }
    }

    this.watch.push({ keys: [...(keys as any)], cb });
  }

  watchAllKeys(cb: PropsWatchCb<P>): void {
    this.guardSetupOnly("def.props.watchAll");
    this.watchAll.push({ cb });
  }

  watchRawKeys(
    keys: (keyof P & string)[],
    cb: RawWatchCb<P & PropsBaseType>,
    devWarn = true
  ): void {
    this.guardSetupOnly("def.props.watchRaw");
    if (!Array.isArray(keys) || keys.length === 0) {
      throw new Error(
        `[Props] watchRaw(keys) requires non-empty keys. Use watchRawAll() instead.`
      );
    }
    this.watchRaw.push({ keys: [...(keys as any)], cb, devWarn });
  }

  watchRawAllKeys(cb: RawWatchCb<P & PropsBaseType>, devWarn = true): void {
    this.guardSetupOnly("def.props.watchRawAll");
    this.watchRawAll.push({ cb, devWarn });
  }

  // -------------------------
  // runtime read API
  // -------------------------

  get(): PropsSnapshot<P> {
    return this.kernel.get();
  }

  getRaw(): Readonly<P & PropsBaseType> {
    return this.kernel.getRaw();
  }

  isProvided(key: keyof P): boolean {
    return this.kernel.isProvided(key);
  }

  // -------------------------
  // internal sync point (NO run)
  // -------------------------

  syncFromHost(): void {
    this.ensureRawPropsSubscription();

    if (!this.caps.has(RAW_PROPS_SOURCE_CAP)) return;

    const src = this.caps.get(
      RAW_PROPS_SOURCE_CAP
    ) as unknown as RawPropsSource<P>;
    if (!src) return;

    if (this.lastSource !== src) this.rawDirty = true;
    if (!this.rawDirty) return;

    const raw = src.get();
    this.applyRaw(raw);

    this.rawDirty = false;
  }

  applyRaw(nextRaw: Record<string, any>): void {
    const { report } = this.kernel.applyRaw({ ...(nextRaw ?? {}) } as any);
    if (report) this.mergePending(report);
    this.rawDirty = false;
  }

  consumeTasks(): PropsWatchTask<P>[] {
    const p = this.pendingReport;
    if (!p) return [];

    // clear pending first (avoid reentrancy weirdness)
    this.pendingReport = null;

    const tasks: PropsWatchTask<P>[] = [];

    const prevResolved = p.prevResolved;
    const nextResolved = p.nextResolved;
    const prevRaw = p.prevRaw;
    const nextRaw = p.nextRaw;

    // resolved all-changes based on declared keys
    const declKeys = Object.keys(nextResolved as any);
    const changedAllResolved = diffKeys(
      prevResolved as any,
      nextResolved as any,
      declKeys
    );

    // raw all-changes based on union keys
    const unionKeys = Array.from(
      new Set([...Object.keys(prevRaw as any), ...Object.keys(nextRaw as any)])
    );
    const changedAllRaw = diffKeys(prevRaw as any, nextRaw as any, unionKeys);

    // raw watchers: rawAll first, then keyed (registration order preserved within group)
    for (const w of this.watchRawAll) {
      if (changedAllRaw.length === 0) continue;
      const info: WatchInfo<P & PropsBaseType> = {
        changedKeysAll: changedAllRaw as any,
        changedKeysMatched: changedAllRaw as any,
      };
      tasks.push({
        kind: "raw",
        cb: w.cb as any,
        next: nextRaw as any,
        prev: prevRaw as any,
        info: info as any,
      });
    }

    for (const w of this.watchRaw) {
      if (changedAllRaw.length === 0) continue;
      const matched = diffKeys(prevRaw as any, nextRaw as any, w.keys);
      if (matched.length === 0) continue;
      const info: WatchInfo<P & PropsBaseType> = {
        changedKeysAll: changedAllRaw as any,
        changedKeysMatched: matched as any,
      };
      tasks.push({
        kind: "raw",
        cb: w.cb as any,
        next: nextRaw as any,
        prev: prevRaw as any,
        info: info as any,
      });
    }

    // resolved watchers: all first, then keyed (registration order preserved within group)
    for (const w of this.watchAll) {
      if (changedAllResolved.length === 0) continue;
      const info: WatchInfo<P> = {
        changedKeysAll: changedAllResolved as any,
        changedKeysMatched: changedAllResolved as any,
      };
      tasks.push({
        kind: "resolved",
        cb: w.cb as any,
        next: nextResolved as any,
        prev: prevResolved as any,
        info: info as any,
      });
    }

    for (const w of this.watch) {
      if (changedAllResolved.length === 0) continue;
      const matched = diffKeys(
        prevResolved as any,
        nextResolved as any,
        w.keys
      );
      if (matched.length === 0) continue;
      const info: WatchInfo<P> = {
        changedKeysAll: changedAllResolved as any,
        changedKeysMatched: matched as any,
      };
      tasks.push({
        kind: "resolved",
        cb: w.cb as any,
        next: nextResolved as any,
        prev: prevResolved as any,
        info: info as any,
      });
    }

    return tasks;
  }

  getDiagnostics() {
    return this.kernel.getDiagnostics?.() ?? [];
  }

  // -------------------------
  // caps + lifecycle wiring
  // -------------------------

  override onProtoPhase(phase: ProtoPhase): void {
    super.onProtoPhase(phase);

    if (phase === "unmounted") {
      this.dispose();
    }
  }

  protected override onCapsEpoch(_epoch: number): void {
    this.ensureRawPropsSubscription();
    this.rawDirty = true;
  }

  dispose(): void {
    this.unsubRaw?.();
    this.unsubRaw = undefined;
    this.subscribed = false;
    this.lastSource = undefined;

    this.rawDirty = true;
    this.pendingReport = null;

    this.kernel.dispose?.();
  }

  // -------------------------
  // internal helpers
  // -------------------------

  private guardSetupOnly(op: string) {
    if (this.protoPhase !== "setup") {
      throw illegalPhase(op, this.protoPhase, {
        prototypeName: this.prototypeName,
        hint: `Use 'run' callbacks (created/mounted/updated) for runtime behavior; do not call def.* after setup.`,
      });
    }
  }

  private mergePending(r: PropsChangeReport<P>): void {
    if (!this.pendingReport) {
      this.pendingReport = {
        prevRaw: r.prevRaw,
        prevResolved: r.prevResolved,
        nextRaw: r.nextRaw,
        nextResolved: r.nextResolved,
      };
      return;
    }
    // last-wins next; keep first prev in this flush window
    this.pendingReport.nextRaw = r.nextRaw;
    this.pendingReport.nextResolved = r.nextResolved;
  }

  private ensureRawPropsSubscription(): void {
    const has = this.caps.has(RAW_PROPS_SOURCE_CAP);

    if (!has) {
      if (this.unsubRaw) {
        this.unsubRaw();
        this.unsubRaw = undefined;
      }
      this.subscribed = false;
      this.lastSource = undefined;
      return;
    }

    const src = this.caps.get(
      RAW_PROPS_SOURCE_CAP
    ) as unknown as RawPropsSource<P>;
    if (!src) {
      if (this.unsubRaw) {
        this.unsubRaw();
        this.unsubRaw = undefined;
      }
      this.subscribed = false;
      this.lastSource = undefined;
      return;
    }

    if (this.subscribed && this.lastSource === src) return;

    if (this.unsubRaw) {
      this.unsubRaw();
      this.unsubRaw = undefined;
    }

    this.lastSource = src;
    this.subscribed = true;

    this.unsubRaw = src.subscribe(() => {
      this.rawDirty = true;
    });
  }
}
