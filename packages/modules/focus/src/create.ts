import {
  type FocusFacts,
  type FocusScopeConfig,
  illegalPhase,
  FocusRequestOptions,
  FocusScopeConfigPatch,
  FocusScopeHandle,
  FocusScopeKey,
  type FocusableConfig,
  FocusableConfigPatch,
  FocusableHandle,
  ObservedStateHandle,
} from '@proto-ui/core';
import { createModule, defineModule, ModuleBase } from '@proto-ui/modules.base';
import type { ModuleFactoryArgs } from '@proto-ui/modules.base';
import type { PropsBaseType } from '@proto-ui/types';
import type { FocusFacade, FocusModule, FocusPort } from './types';
import type { StateEvent } from '@proto-ui/types';
import {
  FOCUS_BLUR_CAP,
  FOCUS_IS_NATIVELY_FOCUSABLE_CAP,
  FOCUS_REQUEST_FOCUS_CAP,
  FOCUS_ROOT_TARGET_CAP,
  FOCUS_SET_FOCUSABLE_CAP,
} from './caps';

const DEFAULT_FOCUSABLE_CONFIG: FocusableConfig = Object.freeze({
  autoFocus: false,
  disabled: false,
  navParticipation: 'auto',
});

const DEFAULT_SCOPE_CONFIG: FocusScopeConfig = Object.freeze({
  trap: false,
  loop: false,
  navigation: 'tab',
  orientation: 'vertical',
  entry: 'first',
  restore: 'none',
  emptyPolicy: 'none',
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

function pushOverrideWarning(
  warnings: string[],
  owner: 'focusable' | 'scope',
  field: string,
  prev: unknown,
  next: unknown
) {
  if (typeof prev === 'undefined' || Object.is(prev, next)) return;
  warnings.push(`[Focus] ${owner}.${field} overridden: ${String(prev)} -> ${String(next)}`);
}

class FocusModuleImpl extends ModuleBase {
  private focusableConfig: FocusableConfig = DEFAULT_FOCUSABLE_CONFIG;
  private scopeConfig: FocusScopeConfig = DEFAULT_SCOPE_CONFIG;
  private readonly prototypeName: string;
  private readonly warnings: string[] = [];
  private didAutoFocus = false;

  private readonly focusedState = createObservedBoolHandle(false);
  private readonly focusVisibleState = createObservedBoolHandle(false);
  private readonly focusableState = createObservedBoolHandle(true);
  private readonly activeState = createObservedBoolHandle(false);
  private readonly hasFocusedState = createObservedBoolHandle(false);

  constructor(caps: ModuleFactoryArgs['caps'], prototypeName: string) {
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

  private getRootTarget(): HTMLElement | null {
    if (!this.caps.has(FOCUS_ROOT_TARGET_CAP)) return null;
    const getter = this.caps.get(FOCUS_ROOT_TARGET_CAP);
    return getter?.() ?? null;
  }

  private syncHostFocusable() {
    const target = this.getRootTarget();
    if (!target) return;

    const enabled = !this.focusableConfig.disabled;
    const isNative = this.caps.has(FOCUS_IS_NATIVELY_FOCUSABLE_CAP)
      ? this.caps.get(FOCUS_IS_NATIVELY_FOCUSABLE_CAP)(target)
      : false;

    if (this.caps.has(FOCUS_SET_FOCUSABLE_CAP)) {
      this.caps.get(FOCUS_SET_FOCUSABLE_CAP)(target, enabled);
      return;
    }

    if (!enabled && isNative) {
      target.tabIndex = -1;
    }
  }

  private readonly focusableHandle: FocusableHandle<any> = {
    focused: this.focusedState.handle,
    focusVisible: this.focusVisibleState.handle,
    focusable: this.focusableState.handle,
    focus: (options?: FocusRequestOptions) => this.requestFocus(options),
    blur: () => this.blur(),
    isFocused: () => this.focusedState.handle.get(),
    setDisabled: (disabled: boolean) => this.setDisabled(disabled),
    configure: (patch: FocusableConfigPatch) => this.configureFocusable(patch),
  };

  private readonly scopeHandle: FocusScopeHandle<any> = {
    active: this.activeState.handle,
    hasFocused: this.hasFocusedState.handle,
    focusFirst: () => this.focusFirst(),
    focusLast: () => this.focusLast(),
    focusNext: () => this.focusNext(),
    focusPrev: () => this.focusPrev(),
    focusSelected: () => this.focusSelected(),
    restoreFocus: () => this.restoreFocus(),
    configure: (patch: FocusScopeConfigPatch) => this.configureScope(patch),
  };

  getFocusable<P extends PropsBaseType = PropsBaseType>(): FocusableHandle<P> {
    return this.focusableHandle as FocusableHandle<P>;
  }

  getScope<P extends PropsBaseType = PropsBaseType>(): FocusScopeHandle<P> {
    return this.scopeHandle as FocusScopeHandle<P>;
  }

  configureFocusable(patch: FocusableConfigPatch): void {
    this.ensureSetup('focus.configureFocusable');
    if (typeof patch.autoFocus !== 'undefined') {
      pushOverrideWarning(
        this.warnings,
        'focusable',
        'autoFocus',
        this.focusableConfig.autoFocus,
        patch.autoFocus
      );
    }
    if (typeof patch.disabled !== 'undefined') {
      pushOverrideWarning(
        this.warnings,
        'focusable',
        'disabled',
        this.focusableConfig.disabled,
        patch.disabled
      );
    }
    if (typeof patch.navParticipation !== 'undefined') {
      pushOverrideWarning(
        this.warnings,
        'focusable',
        'navParticipation',
        this.focusableConfig.navParticipation,
        patch.navParticipation
      );
    }
    if (typeof patch.scopeKey !== 'undefined') {
      pushOverrideWarning(
        this.warnings,
        'focusable',
        'scopeKey',
        this.focusableConfig.scopeKey?.meta?.debugLabel ?? this.focusableConfig.scopeKey?.id,
        patch.scopeKey?.meta?.debugLabel ?? patch.scopeKey?.id
      );
    }

    this.focusableConfig = Object.freeze({
      ...this.focusableConfig,
      ...patch,
      meta: mergeMeta(this.focusableConfig.meta, patch.meta),
    });
    this.setDisabled(this.focusableConfig.disabled, 'focus config updated');
    this.syncHostFocusable();
  }

  configureScope(patch: FocusScopeConfigPatch): void {
    this.ensureSetup('focus.configureScope');
    if (typeof patch.key !== 'undefined') {
      pushOverrideWarning(
        this.warnings,
        'scope',
        'key',
        this.scopeConfig.key?.meta?.debugLabel ?? this.scopeConfig.key?.id,
        patch.key?.meta?.debugLabel ?? patch.key?.id
      );
    }
    if (typeof patch.trap !== 'undefined') {
      pushOverrideWarning(this.warnings, 'scope', 'trap', this.scopeConfig.trap, patch.trap);
    }
    if (typeof patch.loop !== 'undefined') {
      pushOverrideWarning(this.warnings, 'scope', 'loop', this.scopeConfig.loop, patch.loop);
    }
    if (typeof patch.navigation !== 'undefined') {
      pushOverrideWarning(
        this.warnings,
        'scope',
        'navigation',
        this.scopeConfig.navigation,
        patch.navigation
      );
    }
    if (typeof patch.orientation !== 'undefined') {
      pushOverrideWarning(
        this.warnings,
        'scope',
        'orientation',
        this.scopeConfig.orientation,
        patch.orientation
      );
    }
    if (typeof patch.entry !== 'undefined') {
      pushOverrideWarning(this.warnings, 'scope', 'entry', this.scopeConfig.entry, patch.entry);
    }
    if (typeof patch.restore !== 'undefined') {
      pushOverrideWarning(
        this.warnings,
        'scope',
        'restore',
        this.scopeConfig.restore,
        patch.restore
      );
    }
    if (typeof patch.emptyPolicy !== 'undefined') {
      pushOverrideWarning(
        this.warnings,
        'scope',
        'emptyPolicy',
        this.scopeConfig.emptyPolicy,
        patch.emptyPolicy
      );
    }

    this.scopeConfig = Object.freeze({
      ...this.scopeConfig,
      ...patch,
      meta: mergeMeta(this.scopeConfig.meta, patch.meta),
    });
  }

  requestFocus(options?: FocusRequestOptions): void {
    if (this.focusableConfig.disabled) return;
    const target = this.getRootTarget();
    if (target && this.caps.has(FOCUS_REQUEST_FOCUS_CAP)) {
      this.caps.get(FOCUS_REQUEST_FOCUS_CAP)(target, options);
    }
    this.focusedState.set(true, options?.reason ?? 'programmatic');
    this.focusVisibleState.set(options?.reason === 'keyboard', options?.reason);
    this.activeState.set(true, options?.reason ?? 'programmatic');
    this.hasFocusedState.set(true, options?.reason ?? 'programmatic');
  }

  blur(): void {
    const target = this.getRootTarget();
    if (target && this.caps.has(FOCUS_BLUR_CAP)) {
      this.caps.get(FOCUS_BLUR_CAP)(target);
    }
    this.focusedState.set(false, 'blur');
    this.focusVisibleState.set(false, 'blur');
    this.activeState.set(false, 'blur');
  }

  focusFirst(): void {
    if (this.focusableConfig.disabled) return;
    if (this.scopeConfig.emptyPolicy === 'container') {
      this.activeState.set(true, 'focusFirst:container');
      this.hasFocusedState.set(false, 'focusFirst:container');
      this.focusedState.set(false, 'focusFirst:container');
      this.focusVisibleState.set(false, 'focusFirst:container');
      return;
    }
    this.requestFocus({ reason: 'programmatic' });
  }

  focusLast(): void {
    this.requestFocus({ reason: 'programmatic' });
  }

  focusNext(): void {
    this.requestFocus({ reason: 'programmatic' });
  }

  focusPrev(): void {
    this.requestFocus({ reason: 'programmatic' });
  }

  focusSelected(): void {
    this.requestFocus({ reason: 'programmatic' });
  }

  restoreFocus(): void {
    this.requestFocus({ reason: 'programmatic' });
  }

  setDisabled(disabled: boolean, reason: unknown = 'focus.setDisabled'): void {
    this.focusableConfig = Object.freeze({
      ...this.focusableConfig,
      disabled,
    });
    this.focusableState.set(!disabled, reason);
    if (disabled) {
      this.blur();
    }
    this.syncHostFocusable();
  }

  afterRenderCommit(): void {
    this.syncHostFocusable();
    if (this.didAutoFocus) return;
    this.didAutoFocus = true;
    if (this.focusableConfig.autoFocus && !this.focusableConfig.disabled) {
      this.requestFocus({ reason: 'programmatic' });
    }
  }

  getEffectiveScopeKey(): FocusScopeKey | undefined {
    return this.focusableConfig.scopeKey ?? this.scopeConfig.key;
  }

  getFocusableConfig(): FocusableConfig {
    return this.focusableConfig;
  }

  getScopeConfig(): FocusScopeConfig {
    return this.scopeConfig;
  }

  getFacts(): FocusFacts {
    return Object.freeze({
      focused: this.focusedState.handle.get(),
      focusVisible: this.focusVisibleState.handle.get(),
      focusable: this.focusableState.handle.get(),
      active: this.activeState.handle.get(),
      hasFocused: this.hasFocusedState.handle.get(),
    });
  }

  getWarnings(): readonly string[] {
    return Object.freeze(this.warnings.slice());
  }
}

export function createFocusModule(ctx: ModuleFactoryArgs): FocusModule {
  const { init, caps, deps } = ctx;

  return createModule<'focus', 'instance', FocusFacade, FocusPort>({
    name: 'focus',
    scope: 'instance',
    init,
    caps,
    deps,
    build: () => {
      const impl = new FocusModuleImpl(caps, init.prototypeName);
      const port: FocusPort = {
        configureFocusable: (patch) => impl.configureFocusable(patch),
        configureScope: (patch) => impl.configureScope(patch),
        setDisabled: (disabled) => impl.setDisabled(disabled),
        requestFocus: (options) => impl.requestFocus(options),
        blur: () => impl.blur(),
        focusFirst: () => impl.focusFirst(),
        focusLast: () => impl.focusLast(),
        focusNext: () => impl.focusNext(),
        focusPrev: () => impl.focusPrev(),
        focusSelected: () => impl.focusSelected(),
        restoreFocus: () => impl.restoreFocus(),
        getEffectiveScopeKey: () => impl.getEffectiveScopeKey(),
        getFocusableConfig: () => impl.getFocusableConfig(),
        getScopeConfig: () => impl.getScopeConfig(),
        getFacts: () => impl.getFacts(),
        getWarnings: () => impl.getWarnings(),
      };

      return {
        facade: {
          getFocusable: () => impl.getFocusable(),
          getScope: () => impl.getScope(),
        },
        hooks: {
          onProtoPhase: (p) => impl.onProtoPhase(p),
          afterRenderCommit: () => impl.afterRenderCommit(),
        },
        port,
      };
    },
  }) as FocusModule;
}

export const FocusModuleDef = defineModule({
  name: 'focus',
  deps: [],
  create: createFocusModule,
});
