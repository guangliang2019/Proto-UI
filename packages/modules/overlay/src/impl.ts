import type {
  CapsVaultView,
  ObservedStateHandle,
  OverlayConfig,
  OverlayConfigPatch,
  OverlayHandle,
  ProtoPhase,
  OverlayReason,
  OverlayRegistration,
} from '@proto.ui/core';
import { illegalPhase } from '@proto.ui/core';
import { ModuleBase } from '@proto.ui/module-base';
import type { StateEvent } from '@proto.ui/types';
import { HOST_ELEMENT_CAP } from '@proto.ui/module-expose-state-web';
import {
  OVERLAY_GLOBAL_MOUNT_CAP,
  OVERLAY_LAYER_SCHEDULER_CAP,
  OVERLAY_MODAL_CAP,
  type OverlayGlobalMount,
  type OverlayLayerScheduler,
  type OverlayModal,
} from './caps';

const DEFAULT_CONFIG: OverlayConfig = Object.freeze({
  defaultOpen: false,
  closeOnEscape: true,
  closeOnOutsidePress: true,
  closeOnFocusOutside: true,
  closeOnAnchorPress: false,
  closeOnTriggerPress: false,
  placement: 'bottom',
  align: 'start',
  sideOffset: 4,
  alignOffset: 0,
  entry: 'content',
  restore: 'trigger',
  portal: false,
  modal: false,
  layerRole: 'overlay',
  layerOffset: 0,
});

function createObservedBoolHandle(initialValue = false) {
  let value = initialValue;
  const watchers = new Set<(run: any, e: StateEvent<boolean>) => void>();

  const handle: ObservedStateHandle<boolean, any> = {
    get: () => value,
    watch: (cb) => {
      watchers.add(cb as any);
      return () => {
        watchers.delete(cb as any);
      };
    },
  };

  return {
    handle: Object.freeze(handle),
    set(next: boolean, reason?: unknown) {
      if (Object.is(next, value)) return;
      const prev = value;
      value = next;
      const event: StateEvent<boolean> = { type: 'next', next, prev, reason };
      for (const watcher of watchers) {
        watcher(undefined as any, event);
      }
    },
  };
}

function mergeMeta(
  prev: Readonly<Record<string, unknown>> | undefined,
  next: Readonly<Record<string, unknown>> | undefined
): Readonly<Record<string, unknown>> | undefined {
  if (!next) return prev;
  return Object.freeze({
    ...(prev ?? {}),
    ...next,
  });
}

function pushOverrideWarning(warnings: string[], field: string, prev: unknown, next: unknown) {
  if (typeof prev === 'undefined' || Object.is(prev, next)) return;
  warnings.push(`[Overlay] ${field} overridden: ${String(prev)} -> ${String(next)}`);
}

export class OverlayModuleImpl extends ModuleBase {
  private config: OverlayConfig = DEFAULT_CONFIG;
  private readonly prototypeName: string;
  private readonly warnings: string[] = [];
  private lastReason: OverlayReason | undefined = undefined;
  private registration: OverlayRegistration = Object.freeze({
    trigger: null,
    anchor: null,
    content: null,
  });

  private readonly openState = createObservedBoolHandle(false);
  private globalMount: OverlayGlobalMount | null = null;
  private modalLock: OverlayModal | null = null;
  private layerScheduler: OverlayLayerScheduler | null = null;
  private mountedHost: HTMLElement | null = null;
  private layerDetach: (() => void) | null = null;
  private layerHost: HTMLElement | null = null;
  private modalLocked = false;

  constructor(caps: CapsVaultView, prototypeName: string) {
    super(caps);
    this.prototypeName = prototypeName;
    this.refreshHostCaps();
  }

  protected override onCapsEpoch(_epoch: number): void {
    this.refreshHostCaps();
  }

  override onProtoPhase(phase: ProtoPhase): void {
    super.onProtoPhase(phase);
    if (phase !== 'unmounted') return;
    this.teardownOpenSideEffects();
  }

  private refreshHostCaps(): void {
    this.globalMount = this.caps.has(OVERLAY_GLOBAL_MOUNT_CAP)
      ? this.caps.get(OVERLAY_GLOBAL_MOUNT_CAP)
      : null;
    this.modalLock = this.caps.has(OVERLAY_MODAL_CAP) ? this.caps.get(OVERLAY_MODAL_CAP) : null;
    this.layerScheduler = this.caps.has(OVERLAY_LAYER_SCHEDULER_CAP)
      ? this.caps.get(OVERLAY_LAYER_SCHEDULER_CAP)
      : null;
  }

  private ensureSetup(op: string) {
    this.sys?.ensureSetup(op);

    if (!this.sys && this.protoPhase !== 'setup') {
      throw illegalPhase(op, this.protoPhase, {
        prototypeName: this.prototypeName,
      });
    }
  }

  private resolveHostElement(): HTMLElement | null {
    let hostEl: HTMLElement | null =
      this.registration.content instanceof HTMLElement ? this.registration.content : null;
    if (hostEl) return hostEl;
    if (!this.caps.has(HOST_ELEMENT_CAP)) return null;
    const capHost = this.caps.get(HOST_ELEMENT_CAP);
    return capHost instanceof HTMLElement ? capHost : null;
  }

  private mountGlobalIfNeeded(hostEl: HTMLElement): void {
    if (!this.config.portal || !this.globalMount) return;

    if (this.mountedHost === hostEl) return;

    if (this.mountedHost && this.mountedHost !== hostEl) {
      this.globalMount.unmount();
      this.mountedHost = null;
    }

    this.globalMount.mount(hostEl);
    this.mountedHost = hostEl;
  }

  private unmountGlobalIfNeeded(): void {
    if (!this.mountedHost || !this.globalMount) return;
    this.globalMount.unmount();
    this.mountedHost = null;
  }

  private applyLayerIfNeeded(hostEl: HTMLElement): void {
    if (!this.layerScheduler) return;

    if (this.layerDetach && this.layerHost === hostEl) return;

    this.clearLayer();
    this.layerDetach = this.layerScheduler.attach(hostEl, {
      role: this.config.layerRole,
      offset: this.config.layerOffset,
      modal: this.config.modal,
      portal: this.config.portal,
      meta: this.config.meta,
    });
    this.layerHost = hostEl;
  }

  private clearLayer(): void {
    this.layerHost = null;
    if (!this.layerDetach) return;
    try {
      this.layerDetach();
    } finally {
      this.layerDetach = null;
    }
  }

  private lockModalIfNeeded(): void {
    if (!this.config.modal || !this.modalLock || this.modalLocked) return;
    this.modalLock.lock();
    this.modalLocked = true;
  }

  private unlockModalIfNeeded(): void {
    if (!this.modalLock || !this.modalLocked) return;
    this.modalLock.unlock();
    this.modalLocked = false;
  }

  private syncOpenSideEffects(): void {
    const hostEl = this.resolveHostElement();
    if (hostEl) {
      this.mountGlobalIfNeeded(hostEl);
      this.applyLayerIfNeeded(hostEl);
    }
    this.lockModalIfNeeded();
  }

  private teardownOpenSideEffects(): void {
    this.clearLayer();
    this.unmountGlobalIfNeeded();
    this.unlockModalIfNeeded();
  }

  private setOpen(next: boolean, reason?: OverlayReason) {
    this.lastReason = reason;

    const wasOpen = this.openState.handle.get();
    if (Object.is(wasOpen, next)) {
      if (next) {
        this.syncOpenSideEffects();
      }
      return;
    }

    this.openState.set(next, reason);

    if (next) {
      this.syncOpenSideEffects();
      return;
    }

    this.teardownOpenSideEffects();
  }

  private replaceRegistration(next: Partial<OverlayRegistration>) {
    this.registration = Object.freeze({
      trigger: typeof next.trigger === 'undefined' ? this.registration.trigger : next.trigger,
      anchor: typeof next.anchor === 'undefined' ? this.registration.anchor : next.anchor,
      content: typeof next.content === 'undefined' ? this.registration.content : next.content,
    });
  }

  private patchValue<K extends keyof OverlayConfig>(field: K, value: OverlayConfigPatch[K]): void {
    if (typeof value === 'undefined') return;
    pushOverrideWarning(this.warnings, String(field), this.config[field], value);
    this.config = Object.freeze({
      ...this.config,
      [field]: value,
    }) as OverlayConfig;
  }

  configure(patch: OverlayConfigPatch): void {
    this.ensureSetup('overlay.configure');

    this.patchValue('defaultOpen', patch.defaultOpen);
    this.patchValue('closeOnEscape', patch.closeOnEscape);
    this.patchValue('closeOnOutsidePress', patch.closeOnOutsidePress);
    this.patchValue('closeOnFocusOutside', patch.closeOnFocusOutside);
    this.patchValue('closeOnAnchorPress', patch.closeOnAnchorPress);
    this.patchValue('closeOnTriggerPress', patch.closeOnTriggerPress);
    this.patchValue('placement', patch.placement);
    this.patchValue('align', patch.align);
    this.patchValue('sideOffset', patch.sideOffset);
    this.patchValue('alignOffset', patch.alignOffset);
    this.patchValue('entry', patch.entry);
    this.patchValue('restore', patch.restore);
    this.patchValue('portal', patch.portal);
    this.patchValue('modal', patch.modal);
    this.patchValue('layerRole', patch.layerRole);
    this.patchValue('layerOffset', patch.layerOffset);

    if (typeof patch.meta !== 'undefined') {
      this.config = Object.freeze({
        ...this.config,
        meta: mergeMeta(this.config.meta, patch.meta),
      });
    }

    if (this.config.defaultOpen) {
      this.setOpen(true, 'programmatic');
    }
  }

  open(reason?: OverlayReason): void {
    this.setOpen(true, reason);
  }

  close(reason?: OverlayReason): void {
    this.setOpen(false, reason);
  }

  toggle(reason?: OverlayReason): void {
    this.setOpen(!this.openState.handle.get(), reason);
  }

  isOpen(): boolean {
    return this.openState.handle.get();
  }

  getConfig(): OverlayConfig {
    return this.config;
  }

  getWarnings(): readonly string[] {
    return Object.freeze(this.warnings.slice());
  }

  getLastReason(): OverlayReason | undefined {
    return this.lastReason;
  }

  getRegistration(): OverlayRegistration {
    return this.registration;
  }

  registerTrigger(target: unknown): void {
    this.replaceRegistration({ trigger: target });
  }

  registerAnchor(target: unknown): void {
    this.replaceRegistration({ anchor: target });
  }

  registerContent(target: unknown): void {
    this.replaceRegistration({ content: target });

    if (!this.isOpen()) return;

    const hostEl = this.resolveHostElement();
    if (!hostEl) return;
    this.mountGlobalIfNeeded(hostEl);
    this.applyLayerIfNeeded(hostEl);
  }

  readonly handle: OverlayHandle<any> = {
    open: this.openState.handle,
    isOpen: () => this.isOpen(),
    openOverlay: (reason?: OverlayReason) => this.open(reason),
    close: (reason?: OverlayReason) => this.close(reason),
    toggle: (reason?: OverlayReason) => this.toggle(reason),
    configure: (patch: OverlayConfigPatch) => this.configure(patch),
    registerTrigger: (target: unknown) => this.registerTrigger(target),
    registerAnchor: (target: unknown) => this.registerAnchor(target),
    registerContent: (target: unknown) => this.registerContent(target),
  };
}
