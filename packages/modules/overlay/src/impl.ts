import type {
  CapsVaultView,
  ObservedStateHandle,
  OverlayAlign,
  OverlayConfig,
  OverlayConfigPatch,
  OverlayFocusEntry,
  OverlayFocusRestore,
  OverlayHandle,
  OverlayPlacement,
  OverlayReason,
  OverlayRegistration,
} from '@proto.ui/core';
import { illegalPhase } from '@proto.ui/core';
import { ModuleBase } from '@proto.ui/module-base';
import type { StateEvent } from '@proto.ui/types';

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

  constructor(caps: CapsVaultView, prototypeName: string) {
    super(caps);
    this.prototypeName = prototypeName;
  }

  private ensureSetup(op: string) {
    this.sys?.ensureSetup(op);

    if (!this.sys && this.protoPhase !== 'setup') {
      throw illegalPhase(op, this.protoPhase, {
        prototypeName: this.prototypeName,
      });
    }
  }

  private setOpen(next: boolean, reason?: OverlayReason) {
    this.lastReason = reason;
    this.openState.set(next, reason);
  }

  private replaceRegistration(next: Partial<OverlayRegistration>) {
    this.registration = Object.freeze({
      trigger: typeof next.trigger === 'undefined' ? this.registration.trigger : next.trigger,
      anchor: typeof next.anchor === 'undefined' ? this.registration.anchor : next.anchor,
      content: typeof next.content === 'undefined' ? this.registration.content : next.content,
    });
  }

  private patchBoolean<K extends keyof OverlayConfig>(
    field: K,
    value: OverlayConfigPatch[K]
  ): void {
    if (typeof value === 'undefined') return;
    pushOverrideWarning(this.warnings, String(field), this.config[field], value);
    this.config = Object.freeze({
      ...this.config,
      [field]: value,
    });
  }

  private patchLiteral<K extends keyof OverlayConfig>(
    field: K,
    value:
      | OverlayPlacement
      | OverlayAlign
      | OverlayFocusEntry
      | OverlayFocusRestore
      | number
      | undefined
  ): void {
    if (typeof value === 'undefined') return;
    pushOverrideWarning(this.warnings, String(field), this.config[field], value);
    this.config = Object.freeze({
      ...this.config,
      [field]: value,
    });
  }

  configure(patch: OverlayConfigPatch): void {
    this.ensureSetup('overlay.configure');

    this.patchBoolean('defaultOpen', patch.defaultOpen);
    this.patchBoolean('closeOnEscape', patch.closeOnEscape);
    this.patchBoolean('closeOnOutsidePress', patch.closeOnOutsidePress);
    this.patchBoolean('closeOnFocusOutside', patch.closeOnFocusOutside);
    this.patchBoolean('closeOnAnchorPress', patch.closeOnAnchorPress);
    this.patchBoolean('closeOnTriggerPress', patch.closeOnTriggerPress);
    this.patchLiteral('placement', patch.placement);
    this.patchLiteral('align', patch.align);
    this.patchLiteral('sideOffset', patch.sideOffset);
    this.patchLiteral('alignOffset', patch.alignOffset);
    this.patchLiteral('entry', patch.entry);
    this.patchLiteral('restore', patch.restore);

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
