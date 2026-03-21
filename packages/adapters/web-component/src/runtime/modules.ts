import { createCapsWiring } from '@proto-ui/adapters.base';
import type { EffectsPort } from '@proto-ui/core';
import { type RawPropsSource } from '@proto-ui/modules.props';
import { type PropsBaseType } from '@proto-ui/types';

import {
  createWebComponentNameMap,
  webComponentNativeVariantPolicy,
} from '../platform/expose-state-web';
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
}) {
  const { el, router, rawPropsSource, effectsPort, getMeta, exposeStateWebMode, setExposes } = args;

  return createCapsWiring()
    .useProps(rawPropsSource)
    .useFeedback(effectsPort)
    .useEventTargets({
      root: () => router.rootTarget,
      global: () => router.globalTarget,
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
      nameMap: createWebComponentNameMap,
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
    })
    .useAsTrigger({
      instance: el,
      parent: (inst: unknown) => getProtoParent(inst as HTMLElement),
      getPrototype: (inst: unknown) => getPrototypeByInstance(inst as HTMLElement),
    })
    .useRuleMeta((key: string) => getMeta(key))
    .useRuleExposeStateWeb({
      nativeVariantPolicy: webComponentNativeVariantPolicy,
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
