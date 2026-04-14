import {
  createCapsWiring,
  createDomOrderObserver,
  createWebBoundaryHostBridge,
  createWebHitParticipationHostBridge,
} from '@proto.ui/adapter-base';
import type { EffectsPort } from '@proto.ui/core';
import type { RawPropsSource } from '@proto.ui/module-props';
import type { OverlayLayerScheduler } from '@proto.ui/adapter-base';
import {
  createExposeStateWebNameMap,
  createExposeStateWebNativeVariantPolicy,
  type ExposeStateWebMode,
} from '@proto.ui/module-expose-state-web';
import type { PropsBaseType } from '@proto.ui/types';
import type { PresenceHostBridge } from '@proto.ui/module-presence';

import { getProtoParent, getPrototypeByInstance, setProtoParent } from '../platform/instance-tree';

export function createVueModules<Props extends PropsBaseType>(args: {
  el: HTMLElement;
  router: {
    rootTarget: EventTarget;
    globalTarget: EventTarget;
  };
  emit: (key: string, payload?: unknown, options?: Record<string, unknown>) => void;
  rawPropsSource: RawPropsSource<Props>;
  effectsPort: EffectsPort;
  getMeta: (key: string) => unknown;
  exposeStateWebMode?: ExposeStateWebMode;
  setExposes: (record: Record<string, unknown>) => void;
  presenceBridge?: PresenceHostBridge;
  overlayLayerScheduler?: OverlayLayerScheduler;
}) {
  const { el, router, emit, rawPropsSource, effectsPort, getMeta, exposeStateWebMode, setExposes } =
    args;

  return createCapsWiring()
    .useProps(rawPropsSource)
    .useFeedback(effectsPort)
    .useEventTargets({
      root: () => router.rootTarget,
      global: () => router.globalTarget,
      emit,
    })
    .useFocus({
      instance: el,
      parent: (inst: unknown) => getProtoParent(inst as HTMLElement),
      root: () => el,
      isNativelyFocusable,
      setFocusable: (target, enabled) => {
        target.tabIndex = enabled ? 0 : -1;
      },
      requestFocus: (target) => {
        target.focus();
      },
      blur: (target) => {
        target.blur();
      },
    })
    .useExposeState((record) => {
      setExposes(record ?? {});
    })
    .useExposeStateWeb({
      host: el,
      nameMap: createExposeStateWebNameMap,
      mode: exposeStateWebMode,
    })
    .useContext({
      instance: el,
      parent: (inst) => getProtoParent(inst as HTMLElement),
    })
    .useAnatomy({
      instance: el,
      parent: (inst) => getProtoParent(inst as HTMLElement),
      getPrototype: (inst) => getPrototypeByInstance(inst as HTMLElement),
      root: (inst) => inst as HTMLElement,
      orderObserver: createDomOrderObserver,
    })
    .useAsTrigger({
      instance: el,
      parent: (inst) => getProtoParent(inst as HTMLElement),
      getPrototype: (inst) => getPrototypeByInstance(inst as HTMLElement),
    })
    .useRuleMeta((key) => getMeta(key))
    .useRuleExposeStateWeb({
      nativeVariantPolicy: createExposeStateWebNativeVariantPolicy,
    })
    .usePresence(args.presenceBridge ?? { mount: () => {}, unmount: () => {} })
    .useHitParticipation({
      host: el,
      bridge: createWebHitParticipationHostBridge(),
    })
    .useBoundary({
      host: el,
      bridge: createWebBoundaryHostBridge(),
    })
    .useOverlay({
      host: el,
      globalMount: {
        mount(hostEl) {
          if (hostEl.parentElement && hostEl.parentElement !== document.body) {
            setProtoParent(hostEl, hostEl.parentElement);
          }
          if (hostEl.parentNode !== document.body) {
            document.body.appendChild(hostEl);
          }
        },
        unmount() {
          /* Vue unmount handles cleanup */
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
      layerScheduler: args.overlayLayerScheduler,
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
