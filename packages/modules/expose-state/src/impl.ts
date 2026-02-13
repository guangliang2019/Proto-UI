// packages/modules/expose-state/src/impl.ts
import type { CapsVaultView, ProtoPhase, OwnedStateHandle } from '@proto-ui/core';
import { ModuleBase } from '@proto-ui/modules.base';
import type { ModuleDeps } from '@proto-ui/modules.base';
import type { StateEvent, StateSpec } from '@proto-ui/types';

import { EXPOSE_SET_EXPOSES_CAP } from '@proto-ui/modules.expose';
import type { ExposePort } from '@proto-ui/modules.expose';
import type { StatePort } from '@proto-ui/modules.state';

import type { ExposeStateDiag, ExposeStateExternalHandle, ExposeStatePort } from './types';

const STATE_ID = '__stateId';
const STATE_SPEC = '__stateSpec';

function isStateHandleLike(x: any): x is OwnedStateHandle<any> {
  return !!x && typeof x === 'object' && typeof x.get === 'function' && !!x[STATE_ID];
}

function getSpecFromHandle(handle: any): StateSpec | null {
  const spec = handle?.[STATE_SPEC] as StateSpec | undefined;
  return spec ?? null;
}

function toDiag(key: string, value: unknown, isState: boolean): ExposeStateDiag {
  return {
    key,
    kind: isState ? 'state' : 'value',
    valueType: typeof value,
  };
}

export class ExposeStateModuleImpl extends ModuleBase {
  private readonly exposePort: ExposePort;
  private readonly statePort: StatePort;
  private disposed = false;

  private cache = new Map<string, unknown>();

  constructor(caps: CapsVaultView, deps: ModuleDeps) {
    super(caps);
    this.exposePort = deps.requirePort<ExposePort>('expose');
    this.statePort = deps.requirePort<StatePort>('state');
  }

  // -------------------------
  // runtime port
  // -------------------------

  readonly port: ExposeStatePort = {
    get: (key) => {
      this.ensureAlive('rt.exposeState.get');
      this.sync();
      return this.cache.get(key);
    },

    getAll: () => {
      this.ensureAlive('rt.exposeState.getAll');
      this.sync();
      const out: Record<string, unknown> = {};
      for (const [k, v] of this.cache) out[k] = v;
      return out;
    },

    getDiagnostics: () => {
      this.ensureAlive('rt.exposeState.getDiagnostics');
      this.sync();
      const diags: ExposeStateDiag[] = [];
      for (const [k, v] of this.cache) {
        const isState = isStateHandleLike(v) || (v as any)?.spec !== undefined;
        diags.push(toDiag(k, v, isState));
      }
      return diags;
    },
  };

  // -------------------------
  // lifecycle + caps wiring
  // -------------------------

  override onProtoPhase(phase: ProtoPhase): void {
    super.onProtoPhase(phase);
    if (phase === 'unmounted') this.dispose();
  }

  override afterRenderCommit(): void {
    this.publishToHost();
  }

  protected override onCapsEpoch(_epoch: number): void {
    this.publishToHost();
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.cache.clear();
    this.publishToHost(true);
  }

  // -------------------------
  // helpers
  // -------------------------

  private ensureAlive(op: string) {
    this.sys?.ensureNotDisposed(op);
    if (this.disposed) throw new Error(`[ExposeState] disposed. op=${op}`);
  }

  private sync(): void {
    const raw = this.exposePort.getAll();

    this.cache.clear();

    for (const [key, value] of Object.entries(raw)) {
      if (!isStateHandleLike(value)) {
        this.cache.set(key, value);
        continue;
      }

      const spec = getSpecFromHandle(value);
      if (!spec) {
        throw new Error(`[ExposeState] missing StateSpec on exposed handle: ${key}`);
      }

      const external = this.wrapExternalHandle(value, spec);
      this.cache.set(key, external);
    }
  }

  private wrapExternalHandle<V>(
    handle: OwnedStateHandle<V>,
    spec: StateSpec
  ): ExposeStateExternalHandle<V> {
    const external: ExposeStateExternalHandle<V> = {
      get: () => handle.get(),
      subscribe: (cb) => {
        const off = this.statePort.watch(handle, (_ctx, e: StateEvent<V>) => {
          cb(e);
        });
        return off;
      },
      unsubscribe: (off) => {
        if (typeof off === 'function') off();
      },
      spec,
    };

    (external as any).__stateSemantic = (handle as any).__stateSemantic;
    (external as any).__stateId = (handle as any).__stateId;

    return external;
  }

  private publishToHost(clear = false): void {
    if (!this.caps.has(EXPOSE_SET_EXPOSES_CAP)) return;
    const sink = this.caps.get(EXPOSE_SET_EXPOSES_CAP);
    if (!sink) return;

    if (clear) {
      try {
        sink({});
      } catch {}
      return;
    }

    const record = this.port.getAll();
    try {
      sink(record);
    } catch {
      // ignore host errors
    }
  }
}
