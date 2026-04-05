// packages/modules/presence/src/impl.ts
import type { CapsVaultView } from '@proto.ui/core';
import { ModuleBase } from '@proto.ui/module-base';
import { PRESENCE_HOST_BRIDGE_CAP } from './caps';
import type {
  PresenceHandle,
  PresenceHostBridge,
  PresencePhase,
  PresencePolicy,
  PresencePort,
} from './types';

export class PresenceModuleImpl extends ModuleBase {
  private phase: PresencePhase = 'absent';
  /** Guard: only block mount/unmount when a handle was created.
   *  Prototypes without transition hooks should not deadlock on mount. */
  private hasHandle = false;
  private mountResolvers: Array<() => void> = [];
  private unmountResolvers: Array<() => void> = [];
  private beforeMounts: Array<() => void | Promise<void>> = [];
  private beforeUnmounts: Array<() => void | Promise<void>> = [];
  private mountResolved = false;
  private unmountResolved = false;

  private getBridge(): PresenceHostBridge {
    return this.caps.has(PRESENCE_HOST_BRIDGE_CAP)
      ? this.caps.get(PRESENCE_HOST_BRIDGE_CAP)
      : {
          mount: () => {},
          unmount: () => {},
        };
  }

  createHandle(policy?: PresencePolicy): PresenceHandle {
    this.hasHandle = true;
    return {
      setIntent: (intent) => this.setIntent(intent),
      getPhase: () => this.phase,
      onBeforeMount: (cb) => {
        this.beforeMounts.push(cb);
        return () => {
          const idx = this.beforeMounts.indexOf(cb);
          if (idx >= 0) this.beforeMounts.splice(idx, 1);
        };
      },
      onBeforeUnmount: (cb) => {
        this.beforeUnmounts.push(cb);
        return () => {
          const idx = this.beforeUnmounts.indexOf(cb);
          if (idx >= 0) this.beforeUnmounts.splice(idx, 1);
        };
      },
    };
  }

  private async setIntent(intent: 'enter' | 'leave') {
    if (intent === 'enter') {
      if (this.phase === 'absent') {
        this.phase = 'mounting';
        await this.runCbs(this.beforeMounts);
        await this.getBridge().mount();
        this.resolveMounts();
        this.phase = 'present';
      } else if (this.phase === 'unmounting') {
        this.resolveUnmounts();
        this.phase = 'present';
      }
    } else {
      if (this.phase === 'present') {
        this.phase = 'unmounting';
      } else if (this.phase === 'unmounting') {
        await this.runCbs(this.beforeUnmounts);
        await this.getBridge().unmount();
        this.resolveUnmounts();
        this.phase = 'absent';
      } else if (this.phase === 'mounting') {
        this.resolveMounts();
        await this.getBridge().unmount();
        this.phase = 'absent';
      } else if (this.phase === 'absent') {
        this.resolveMounts();
      }
    }
  }

  private async runCbs(cbs: Array<() => void | Promise<void>>) {
    for (const cb of cbs) {
      await cb();
    }
  }

  private resolveMounts() {
    for (const r of this.mountResolvers) r();
    this.mountResolvers = [];
    this.mountResolved = true;
  }

  private resolveUnmounts() {
    for (const r of this.unmountResolvers) r();
    this.unmountResolvers = [];
    this.unmountResolved = true;
  }

  awaitMount(): Promise<void> | undefined {
    if (!this.hasHandle || this.phase !== 'absent') return undefined;
    // If mount was already resolved (e.g., by leave intent while absent),
    // there's no need to block.
    if (this.mountResolved) return undefined;
    return new Promise<void>((resolve) => {
      this.mountResolvers.push(resolve);
    });
  }

  awaitUnmount(): Promise<void> | undefined {
    if (!this.hasHandle || this.phase === 'absent') return undefined;
    return new Promise<void>((resolve) => {
      this.unmountResolvers.push(resolve);
    });
  }
}
