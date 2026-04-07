import { createCapsWiring, createDomOrderObserver } from '@proto.ui/adapter-base';
import type { EffectsPort } from '@proto.ui/core';
import { type RawPropsSource } from '@proto.ui/module-props';
import {
  createExposeStateWebNameMap,
  createExposeStateWebNativeVariantPolicy,
} from '@proto.ui/module-expose-state-web';
import { type PropsBaseType } from '@proto.ui/types';

import { type PresenceHostBridge } from '@proto.ui/module-presence';

import { getProtoParent, getPrototypeByInstance } from '../platform/instance-tree';

export function createWebComponentModules<Props extends PropsBaseType>(args: {
  el: HTMLElement;
  router: {
    rootTarget: EventTarget;
    globalTarget: EventTarget;
  };
  rawPropsSource: RawPropsSource<Props>;
  effectsPort: EffectsPort;
  getMeta: (key: string) => unknown;
  exposeStateWebMode?: {
    allowContinuousAttr?: boolean;
    allowStringVar?: boolean;
  };
  setExposes: (record: Record<string, unknown>) => void;
  presenceBridge?: PresenceHostBridge;
}) {
  const { el, router, rawPropsSource, effectsPort, getMeta, exposeStateWebMode, setExposes } = args;

  let mountedEl: HTMLElement | null = null;
  let originalParent: Node | null = null;
  let originalNext: Node | null = null;

  return createCapsWiring()
    .useProps(rawPropsSource)
    .useFeedback(effectsPort)
    .useEventTargets({
      root: () => router.rootTarget,
      global: () => router.globalTarget,
      emit: (key, payload, options) => {
        const ev = new CustomEvent(key, {
          detail: payload,
          bubbles: true,
          cancelable: true,
          ...options,
        });
        el.dispatchEvent(ev);
      },
    })
    .useFocus({
      instance: el,
      parent: (inst: unknown) => getProtoParent(inst as HTMLElement),
      root: () => el,
      isNativelyFocusable: (target: HTMLElement) => isNativelyFocusable(target),
      setFocusable: (target: HTMLElement, enabled: boolean) => {
        target.tabIndex = enabled ? 0 : -1;
      },
      requestFocus: (target: HTMLElement) => {
        target.focus();
      },
      blur: (target: HTMLElement) => {
        target.blur();
      },
    })
    .useExposeState((record: Record<string, unknown>) => {
      setExposes(record ?? {});
    })
    .useExposeStateWeb({
      host: el,
      nameMap: createExposeStateWebNameMap,
      mode: exposeStateWebMode,
    })
    .useContext({
      instance: el,
      parent: (inst: unknown) => getProtoParent(inst as HTMLElement),
    })
    .useAnatomy({
      instance: el,
      parent: (inst: unknown) => getProtoParent(inst as HTMLElement),
      getPrototype: (inst: unknown) => getPrototypeByInstance(inst as HTMLElement),
      root: (inst: unknown) => inst as HTMLElement,
      orderObserver: createDomOrderObserver,
    })
    .useAsTrigger({
      instance: el,
      parent: (inst: unknown) => getProtoParent(inst as HTMLElement),
      getPrototype: (inst: unknown) => getPrototypeByInstance(inst as HTMLElement),
    })
    .useRuleMeta((key: string) => getMeta(key))
    .useRuleExposeStateWeb({
      nativeVariantPolicy: createExposeStateWebNativeVariantPolicy,
    })
    .usePresence(args.presenceBridge ?? { mount: () => {}, unmount: () => {} })
    .useOverlay({
      globalMount: {
        mount(el) {
          if (el.parentNode === document.body) return;
          mountedEl = el;
          originalParent = el.parentNode;
          originalNext = el.nextSibling;
          try {
            Object.defineProperty(el, 'parentNode', {
              get() {
                return originalParent;
              },
              configurable: true,
            });
          } catch {}
          document.body.appendChild(el);
        },
        unmount() {
          if (!mountedEl) return;
          if (originalParent) {
            originalParent.insertBefore(mountedEl, originalNext);
          }
          try {
            Object.defineProperty(mountedEl, 'parentNode', {
              get() {
                return originalParent;
              },
              configurable: true,
            });
          } catch {}
          mountedEl = null;
        },
      },
      modal: {
        lock() {
          const original = document.body.style.overflow;
          (document.body as any).__proto_ui_original_overflow = original;
          document.body.style.overflow = 'hidden';
        },
        unlock() {
          const original = (document.body as any).__proto_ui_original_overflow ?? '';
          document.body.style.overflow = original;
          delete (document.body as any).__proto_ui_original_overflow;
        },
      },
    })
    .build();
}

function isNativelyFocusable(el: HTMLElement): boolean {
  const tag = el.tagName.toLowerCase();
  if (tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea') {
    return true;
  }
  if (tag === 'a') {
    return el.hasAttribute('href');
  }
  return false;
}
