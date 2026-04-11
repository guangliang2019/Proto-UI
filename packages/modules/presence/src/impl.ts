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

function isPromiseLike<T>(value: T | PromiseLike<T>): value is PromiseLike<T> {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as PromiseLike<T>).then === 'function'
  );
}

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

  /** Tracks whether bridge.mount() has actually been invoked and not yet settled. */
  private pendingMount: void | Promise<void> | null = null;
  /** Tracks whether bridge.unmount() has actually been invoked and not yet settled. */
  private pendingUnmount: void | Promise<void> | null = null;

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

  private setIntent(intent: 'enter' | 'leave') {
    if (intent === 'enter') {
      if (this.phase === 'absent') {
        this.phase = 'mounting';
        this.pendingUnmount = null;
        this.runCbsSync(this.beforeMounts);
        const mountResult = this.getBridge().mount();
        this.pendingMount = mountResult ?? null;
        if (isPromiseLike(mountResult)) {
          const activeMount = mountResult;
          mountResult.then(
            () => {
              if (this.pendingMount !== activeMount) return;
              this.pendingMount = null;
              this.resolveMounts();
              this.phase = 'present';
            },
            () => {
              if (this.pendingMount !== activeMount) return;
              this.pendingMount = null;
              this.resolveMounts();
              this.phase = 'present';
            }
          );
        } else {
          this.pendingMount = null;
          this.resolveMounts();
          this.phase = 'present';
        }
      } else if (this.phase === 'unmounting') {
        const settle = () => {
          this.pendingUnmount = null;
          this.resolveUnmounts();
          this.phase = 'present';
        };
        // Only call bridge.mount() if structural unmount was actually started.
        // If we are still in the first-stage unmounting (unmount() not yet called),
        // we can roll back without notifying the host.
        if (this.pendingUnmount != null) {
          // Invalidate the currently pending unmount first so stale async
          // completion cannot flip phase back to absent after re-enter.
          this.pendingUnmount = null;
          const mountResult = this.getBridge().mount();
          this.pendingMount = mountResult ?? null;
          if (isPromiseLike(mountResult)) {
            const activeMount = mountResult;
            mountResult.then(
              () => {
                if (this.pendingMount !== activeMount) return;
                this.pendingMount = null;
                settle();
              },
              () => {
                if (this.pendingMount !== activeMount) return;
                this.pendingMount = null;
                settle();
              }
            );
          } else {
            this.pendingMount = null;
            settle();
          }
        } else {
          settle();
        }
      }
    } else {
      if (this.phase === 'present') {
        this.phase = 'unmounting';
      } else if (this.phase === 'unmounting') {
        this.runCbsSync(this.beforeUnmounts);
        // Reverse-enter may leave a pending mount callback; invalidate it
        // before starting unmount to avoid stale present settlement.
        this.pendingMount = null;
        const unmountResult = this.getBridge().unmount();
        this.pendingUnmount = unmountResult ?? null;
        if (isPromiseLike(unmountResult)) {
          const activeUnmount = unmountResult;
          unmountResult.then(
            () => {
              if (this.pendingUnmount !== activeUnmount) return;
              this.pendingUnmount = null;
              this.resolveUnmounts();
              this.phase = 'absent';
              this.mountResolved = false;
            },
            () => {
              if (this.pendingUnmount !== activeUnmount) return;
              this.pendingUnmount = null;
              this.resolveUnmounts();
              this.phase = 'absent';
              this.mountResolved = false;
            }
          );
        } else {
          this.pendingUnmount = null;
          this.resolveUnmounts();
          this.phase = 'absent';
          this.mountResolved = false;
        }
      } else if (this.phase === 'mounting') {
        const settle = () => {
          this.pendingMount = null;
          this.resolveMounts();
          this.phase = 'absent';
          this.mountResolved = false;
        };
        // Only call bridge.unmount() if structural mount was actually started.
        if (this.pendingMount != null) {
          // Invalidate pending mount completion before reversing.
          this.pendingMount = null;
          const unmountResult = this.getBridge().unmount();
          this.pendingUnmount = unmountResult ?? null;
          if (isPromiseLike(unmountResult)) {
            const activeUnmount = unmountResult;
            unmountResult.then(
              () => {
                if (this.pendingUnmount !== activeUnmount) return;
                this.pendingUnmount = null;
                settle();
              },
              () => {
                if (this.pendingUnmount !== activeUnmount) return;
                this.pendingUnmount = null;
                settle();
              }
            );
          } else {
            this.pendingUnmount = null;
            settle();
          }
        } else {
          settle();
        }
      } else if (this.phase === 'absent') {
        this.resolveMounts();
      }
    }
  }

  private runCbsSync(cbs: Array<() => void | Promise<void>>) {
    for (const cb of cbs) {
      const result = cb();
      if (isPromiseLike(result)) {
        (result as Promise<void>).catch(() => {});
      }
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
