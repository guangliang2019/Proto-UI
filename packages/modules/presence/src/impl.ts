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
  private bridge: PresenceHostBridge;
  private phase: PresencePhase = 'absent';
  private mountResolvers: Array<() => void> = [];
  private unmountResolvers: Array<() => void> = [];
  private beforeMounts: Array<() => void | Promise<void>> = [];
  private beforeUnmounts: Array<() => void | Promise<void>> = [];

  constructor(caps: CapsVaultView, _prototypeName: string) {
    super(caps);
    this.bridge = this.caps.get(PRESENCE_HOST_BRIDGE_CAP) ?? {
      mount: () => {},
      unmount: () => {},
    };
  }

  createHandle(policy?: PresencePolicy): PresenceHandle {
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
        await this.bridge.mount();
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
        await this.bridge.unmount();
        this.resolveUnmounts();
        this.phase = 'absent';
      } else if (this.phase === 'mounting') {
        this.resolveMounts();
        await this.bridge.unmount();
        this.phase = 'absent';
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
  }

  private resolveUnmounts() {
    for (const r of this.unmountResolvers) r();
    this.unmountResolvers = [];
  }

  async awaitMount(): Promise<void> {
    if (this.phase !== 'absent') return;
    return new Promise<void>((resolve) => {
      this.mountResolvers.push(resolve);
    });
  }

  async awaitUnmount(): Promise<void> {
    if (this.phase === 'absent') return;
    return new Promise<void>((resolve) => {
      this.unmountResolvers.push(resolve);
    });
  }
}
