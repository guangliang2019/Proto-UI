import { SYS_CAP } from '@proto.ui/module-base';
import {
  ANATOMY_GET_PROTO_CAP,
  ANATOMY_INSTANCE_TOKEN_CAP,
  ANATOMY_ORDER_OBSERVER_CAP,
  ANATOMY_PARENT_CAP,
  ANATOMY_ROOT_TARGET_CAP,
} from '../../src/caps';

type ExecPhase = 'setup' | 'render' | 'callback' | 'unknown';
type ProtoPhase = 'setup' | 'mounted' | 'updated' | 'unmounted';

export function createSysCaps() {
  let execPhase: ExecPhase = 'setup';
  let protoPhase: ProtoPhase = 'setup';
  let disposed = false;

  return {
    execPhase: () => execPhase,
    protoPhase: () => protoPhase,
    isDisposed: () => disposed,
    ensureNotDisposed(op: string) {
      if (disposed) throw new Error(`[Disposed] ${op}`);
    },
    ensureSetup(op: string) {
      if (execPhase !== 'setup') throw new Error(`[Phase] ${op} setup-only, got ${execPhase}`);
    },
    ensureRuntime(op: string) {
      if (execPhase === 'setup') throw new Error(`[Phase] ${op} runtime-only, got setup`);
    },
    ensureCallback(op: string) {
      if (execPhase !== 'callback')
        throw new Error(`[Phase] ${op} callback-only, got ${execPhase}`);
    },
    __setExecPhase(p: ExecPhase) {
      execPhase = p;
    },
    __setProtoPhase(p: ProtoPhase) {
      protoPhase = p;
    },
    __dispose() {
      disposed = true;
    },
  };
}

export function makeCaps(args: {
  sys?: any;
  instance: unknown;
  getParent: (instance: unknown) => unknown | null;
  getPrototype: (instance: unknown) => any;
  getRootTarget?: (instance: unknown) => unknown | null;
  orderObserver?: (target: unknown, notify: () => void) => () => void;
}) {
  let epoch = 0;
  const subs = new Set<(epoch: number) => void>();
  const store = new Map<string, any>();
  const sys = args.sys ?? createSysCaps();

  store.set(SYS_CAP.id, sys);
  store.set(ANATOMY_INSTANCE_TOKEN_CAP.id, args.instance);
  store.set(ANATOMY_PARENT_CAP.id, args.getParent);
  store.set(ANATOMY_GET_PROTO_CAP.id, args.getPrototype);
  if (args.getRootTarget) {
    store.set(ANATOMY_ROOT_TARGET_CAP.id, args.getRootTarget);
  }
  if (args.orderObserver) {
    store.set(ANATOMY_ORDER_OBSERVER_CAP.id, args.orderObserver);
  }

  return {
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
  } as any;
}
