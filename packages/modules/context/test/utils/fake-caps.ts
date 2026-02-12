// packages/modules/context/test/utils/fake-caps.ts
import { SYS_CAP } from "@proto-ui/modules.base";
import {
  CONTEXT_INSTANCE_TOKEN_CAP,
  CONTEXT_PARENT_CAP,
  type ContextInstanceToken,
  type ContextParentGetter,
} from "../../src/caps";

type ExecPhase = "setup" | "render" | "callback" | "unknown";
type ProtoPhase = "setup" | "mounted" | "updated" | "unmounted";

export function createSysCaps() {
  let execPhase: ExecPhase = "setup";
  let protoPhase: ProtoPhase = "setup";
  let disposed = false;
  let callbackCtx: unknown = undefined;

  const sys = {
    execPhase: () => execPhase,
    domain: () => (execPhase === "setup" ? "setup" : "runtime"),
    protoPhase: () => protoPhase,
    isDisposed: () => disposed,

    ensureNotDisposed(op: string) {
      if (disposed) throw new Error(`[Disposed] ${op}`);
    },

    ensureExecPhase(op: string, expected: ExecPhase | ExecPhase[]) {
      const list = Array.isArray(expected) ? expected : [expected];
      if (!list.includes(execPhase)) {
        const e = new Error(
          `[Phase] ${op} expected ${list.join("|")} got ${execPhase}`
        ) as any;
        e.code = "CONTEXT_PHASE_VIOLATION";
        throw e;
      }
    },

    ensureSetup(op: string) {
      if (execPhase !== "setup") {
        const e = new Error(
          `[Phase] ${op} setup-only, got ${execPhase}`
        ) as any;
        e.code = "CONTEXT_PHASE_VIOLATION";
        throw e;
      }
    },

    ensureRuntime(op: string) {
      if (execPhase === "setup") {
        const e = new Error(`[Phase] ${op} runtime-only, got setup`) as any;
        e.code = "CONTEXT_PHASE_VIOLATION";
        throw e;
      }
    },

    ensureCallback(op: string) {
      if (execPhase !== "callback") {
        const e = new Error(
          `[Phase] ${op} callback-only, got ${execPhase}`
        ) as any;
        e.code = "CONTEXT_PHASE_VIOLATION";
        throw e;
      }
    },

    getCallbackCtx: () => (execPhase === "callback" ? callbackCtx : undefined),

    // test controls
    __setExecPhase(p: ExecPhase) {
      execPhase = p;
    },
    __setProtoPhase(p: ProtoPhase) {
      protoPhase = p;
    },
    __setCallbackCtx(ctx: unknown) {
      callbackCtx = ctx;
    },
    __dispose() {
      disposed = true;
    },
  };

  return sys;
}

export function makeCaps(args: {
  sys?: any;
  instanceToken: ContextInstanceToken;
  getParent: ContextParentGetter;
}) {
  let epoch = 0;
  const subs = new Set<(epoch: number) => void>();
  const store = new Map<string, any>();

  const sys = args.sys ?? createSysCaps();

  store.set(SYS_CAP.id, sys);
  store.set(CONTEXT_INSTANCE_TOKEN_CAP.id, args.instanceToken);
  store.set(CONTEXT_PARENT_CAP.id, args.getParent);

  const api = {
    has(token: any) {
      return store.has(token.id);
    },

    get(token: any) {
      return store.get(token.id);
    },

    onChange(cb: (epoch: number) => void) {
      subs.add(cb);
      return () => subs.delete(cb);
    },

    __bumpEpoch() {
      epoch++;
      for (const cb of subs) cb(epoch);
    },

    __sys: sys,
  };

  return api as any;
}
