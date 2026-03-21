// packages/adapters/web-component/src/adapt.ts
import type { Prototype } from '@proto-ui/core';
import { PropsBaseType } from '@proto-ui/types';

import { type RawPropsSource } from '@proto-ui/modules.props';

import {
  createHostWiring,
  createEventGate,
  createWebProtoEventRouter,
} from '@proto-ui/adapters.base';

import { bindController, getElementProps, unbindController } from './props';
import { SlotProjector } from './slot-projector';
import { createOwnedTwTokenApplier } from './feedback-style';
import { installDebugHooks, removeDebugHooks } from './debug/hooks';
import { installDefaultHostDisplay, type HostDisplayController } from './host-display';
import { createDefaultMetaGetter } from './platform/meta';
import { markProtoInstance } from './platform/instance-tree';
import { createWebEffectsPort } from './runtime/effects-port';
import { createWebComponentModules } from './runtime/modules';
import { createWebComponentHostSession } from './runtime/session';

export { __WC_DEBUG_SYS } from './debug/hooks';

function assertKebabCase(tag: string) {
  if (!tag.includes('-') || tag.toLowerCase() !== tag) {
    throw new Error(`[WC Adapter] custom element name must be kebab-case and contain '-': ${tag}`);
  }
}

export interface WebComponentAdapterOptions<Props extends PropsBaseType = PropsBaseType> {
  shadow?: boolean;
  register?: boolean;
  registerAs?: string;
  getProps?: (el: HTMLElement) => Partial<Props> | null | undefined;
  schedule?: (task: () => void) => void;
  getMeta?: (key: string) => unknown;
  exposeStateWebMode?: {
    allowContinuousAttr?: boolean;
    allowStringVar?: boolean;
  };
}

export function AdaptToWebComponent<Props extends PropsBaseType>(
  proto: Prototype<Props>,
  opt: WebComponentAdapterOptions<Props> = {}
) {
  const register = opt.register ?? true;
  const tagName = opt.registerAs ?? proto.name;
  assertKebabCase(tagName);

  const shadow = opt.shadow ?? false;
  const getProps = opt.getProps ?? (() => ({}) as Partial<Props>);
  const schedule = opt.schedule ?? ((task) => queueMicrotask(task));
  const getMeta = opt.getMeta ?? createDefaultMetaGetter();
  const exposeStateWebMode = opt.exposeStateWebMode;

  class ProtoElement extends HTMLElement {
    private _mountedOnce = false;
    private _invokeUnmounted: (() => void) | null = null;
    private _disconnectVersion = 0;
    private _pendingOwnedTokens: string[] | null = null;

    private _root: Element | ShadowRoot;
    private _slotProjector: SlotProjector | null = null;
    private _hostDisplay: HostDisplayController | null = null;

    private _applier: ReturnType<typeof createOwnedTwTokenApplier> | null = null;
    private _exposes: Record<string, unknown> = {};

    constructor() {
      super();
      this._root = shadow ? (this.attachShadow({ mode: 'open' }) as ShadowRoot) : this;
      markProtoInstance(this, proto as Prototype<any>);
    }

    connectedCallback() {
      this._disconnectVersion += 1;
      if (this._mountedOnce) {
        if (this._pendingOwnedTokens?.length) {
          this._applier?.apply(this._pendingOwnedTokens);
        }
        this._hostDisplay?.sync();
        this._pendingOwnedTokens = null;
        return;
      }
      this._mountedOnce = true;

      const eventGate = createEventGate();

      const thisEl = this;
      const thisRoot = this._root;
      this._hostDisplay = installDefaultHostDisplay(thisEl);

      const router = createWebProtoEventRouter({
        rootEl: thisEl,
        globalEl: window,
        isEnabled: () => eventGate.isEnabled?.() ?? true, // 看你 eventGate API，没就自己存个 boolean
      });

      // Create applier/effectsPort BEFORE executeWithHost,
      // because we must inject them in host.onRuntimeReady (CP1).
      const applier = createOwnedTwTokenApplier(thisEl, {
        onChange: () => {
          this._hostDisplay?.sync();
        },
      });
      this._applier = applier;

      const effectsPort = createWebEffectsPort(applier);

      const rawPropsSource: RawPropsSource<Props> = {
        debugName: `${tagName}#raw-props`,

        get(): Readonly<Props & PropsBaseType> {
          // attrs-first, then opt.getProps
          const p = getElementProps(thisEl) ?? getProps(thisEl) ?? ({} as Partial<Props>);

          // WC 从 DOM 取值，类型安全只能止步于边界；用 unknown 双断言把风险收口在这一处
          return p as unknown as Readonly<Props & PropsBaseType>;
        },

        subscribe(cb) {
          const mo = new MutationObserver((records) => {
            for (const r of records) {
              if (r.type === 'attributes') {
                cb();
                break;
              }
            }
          });

          mo.observe(thisEl, { attributes: true });
          return () => mo.disconnect();
        },
      };

      const modules = createWebComponentModules({
        el: thisEl,
        router,
        rawPropsSource,
        effectsPort,
        getMeta,
        exposeStateWebMode,
        setExposes: (record) => {
          this._exposes = record;
        },
      });

      const wiring = createHostWiring({ prototypeName: tagName, modules });

      const hostSession = createWebComponentHostSession({
        proto,
        tagName,
        shadow,
        host: thisEl,
        root: thisRoot,
        schedule,
        rawPropsSource,
        wiring,
        eventGate,
        router,
        getSlotProjector: () => this._slotProjector,
        ensureSlotProjector: () => {
          if (!this._slotProjector) this._slotProjector = new SlotProjector(thisEl);
          return this._slotProjector;
        },
        clearSlotProjector: () => {
          this._slotProjector?.disconnect();
          this._slotProjector = null;
        },
        onAfterUnmount: () => {
          this._exposes = {};
          this._applier?.clear();
          this._applier = null;
          this._hostDisplay?.disconnect();
          this._hostDisplay = null;
          unbindController(this);
          removeDebugHooks(this);
        },
      });

      const { controller } = hostSession;
      installDebugHooks(thisEl, hostSession.caps);

      // expose update for convenience (existing behavior)
      (this as any).update = () => controller.update();
      (this as any).getExposes = () => {
        if (!this.isConnected) return {};
        return { ...(this._exposes ?? {}) };
      };

      bindController(this, controller);

      // Teardown must keep caps alive until unmounted callbacks finish.
      this._invokeUnmounted = () => hostSession.dispose();
    }

    disconnectedCallback() {
      this._pendingOwnedTokens = this._applier ? Array.from(this._applier.getOwned()) : null;
      this._applier?.clear();
      this._hostDisplay?.sync();

      const disconnectVersion = ++this._disconnectVersion;
      queueMicrotask(() => {
        if (this._disconnectVersion !== disconnectVersion) {
          if (this._pendingOwnedTokens?.length) {
            this._applier?.apply(this._pendingOwnedTokens);
          }
          this._hostDisplay?.sync();
          this._pendingOwnedTokens = null;
          return;
        }
        if (this.isConnected) return;

        this._invokeUnmounted?.();
        this._invokeUnmounted = null;
        this._mountedOnce = false;
        this._pendingOwnedTokens = null;
      });
    }
  }

  if (register && !customElements.get(tagName)) {
    customElements.define(tagName, ProtoElement);
  }

  return ProtoElement;
}
