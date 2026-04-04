import { createCapsWiring, createDomOrderObserver } from '@proto.ui/adapter-base';
import type { EffectsPort } from '@proto.ui/core';
import type { RawPropsSource } from '@proto.ui/module-props';
import {
  createExposeStateWebNameMap,
  createExposeStateWebNativeVariantPolicy,
  type ExposeStateWebMode,
} from '@proto.ui/module-expose-state-web';
import type { PropsBaseType } from '@proto.ui/types';

import { getProtoParent, getPrototypeByInstance } from '../platform/instance-tree';

export function createReactModules<Props extends PropsBaseType>(args: {
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
    .build();
}

function isNativelyFocusable(el: HTMLElement): boolean {
  const tag = el.tagName.toLowerCase();
  if (tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea') {
    return true;
  }
  if (tag === 'a') return el.hasAttribute('href');
  return false;
}
