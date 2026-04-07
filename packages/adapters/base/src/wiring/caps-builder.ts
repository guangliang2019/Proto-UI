// packages/adapters/base/src/wiring/caps-builder.ts
import type { CapEntries } from '@proto.ui/core';
import type { WiringSpec } from '../types';

import { RAW_PROPS_SOURCE_CAP, type RawPropsSource } from '@proto.ui/module-props';
import { EFFECTS_CAP } from '@proto.ui/module-feedback';
import { PRESENCE_HOST_BRIDGE_CAP, type PresenceHostBridge } from '@proto.ui/module-presence';
import {
  OVERLAY_GLOBAL_MOUNT_CAP,
  OVERLAY_MODAL_CAP,
  type OverlayGlobalMount,
  type OverlayModal,
} from '@proto.ui/module-overlay';
import {
  EVENT_GLOBAL_TARGET_CAP,
  EVENT_EMIT_CAP,
  EVENT_ROOT_TARGET_CAP,
  type EventEmitSink,
  type EventTargetGetter,
} from '@proto.ui/module-event';
import { EXPOSE_SET_EXPOSES_CAP, type ExposeHostSink } from '@proto.ui/module-expose';
import {
  EXPOSE_STATE_WEB_MAP_CAP,
  EXPOSE_STATE_WEB_MODE_CAP,
  HOST_ELEMENT_CAP,
  type ExposeStateWebMode,
  type ExposeStateWebNameMap,
} from '@proto.ui/module-expose-state-web';
import {
  ANATOMY_GET_PROTO_CAP,
  ANATOMY_INSTANCE_TOKEN_CAP,
  ANATOMY_ORDER_OBSERVER_CAP,
  ANATOMY_PARENT_CAP,
  ANATOMY_ROOT_TARGET_CAP,
  type AnatomyInstanceToken,
  type AnatomyOrderObserver,
  type AnatomyParentGetter,
  type AnatomyPrototypeGetter,
  type AnatomyRootTargetGetter,
} from '@proto.ui/module-anatomy';
import {
  CONTEXT_INSTANCE_TOKEN_CAP,
  CONTEXT_PARENT_CAP,
  type ContextParentGetter,
  type ContextInstanceToken,
} from '@proto.ui/module-context';
import {
  AS_TRIGGER_GET_PROTO_CAP,
  AS_TRIGGER_INSTANCE_CAP,
  AS_TRIGGER_PARENT_CAP,
  type AsTriggerInstanceToken,
  type AsTriggerParentGetter,
  type AsTriggerPrototypeGetter,
} from '@proto.ui/module-as-trigger';
import { RULE_META_GET_CAP, type RuleMetaGetter } from '@proto.ui/module-rule-meta';
import {
  RULE_EXPOSE_STATE_WEB_NATIVE_VARIANT_POLICY_CAP,
  type RuleExposeStateWebNativeVariantPolicy,
} from '@proto.ui/module-rule-expose-state-web';
import {
  FOCUS_BLUR_CAP,
  FOCUS_INSTANCE_TOKEN_CAP,
  FOCUS_IS_NATIVELY_FOCUSABLE_CAP,
  FOCUS_PARENT_CAP,
  FOCUS_REQUEST_FOCUS_CAP,
  FOCUS_ROOT_TARGET_CAP,
  FOCUS_SET_FOCUSABLE_CAP,
  type FocusBlur,
  type FocusInstanceToken,
  type FocusIsNativelyFocusable,
  type FocusParentGetter,
  type FocusRequestFocus,
  type FocusRootTargetGetter,
  type FocusSetFocusable,
} from '@proto.ui/module-focus';
import type { EffectsPort } from '@proto.ui/core';
import type { PropsBaseType } from '@proto.ui/types';

export type CapsWiringBuilder = {
  add(moduleName: string, provide: () => CapEntries): CapsWiringBuilder;
  useProps<P extends PropsBaseType>(source: RawPropsSource<P>): CapsWiringBuilder;
  useFeedback(effects: EffectsPort): CapsWiringBuilder;
  useEventTargets(args: {
    root: EventTargetGetter;
    global: EventTargetGetter;
    emit?: EventEmitSink;
  }): CapsWiringBuilder;
  useExposeState(setExposes: ExposeHostSink): CapsWiringBuilder;
  useExposeStateWeb(args: {
    host: HTMLElement;
    nameMap: ExposeStateWebNameMap;
    mode?: ExposeStateWebMode;
  }): CapsWiringBuilder;
  useContext(args: {
    instance: ContextInstanceToken;
    parent: ContextParentGetter;
  }): CapsWiringBuilder;
  useAnatomy(args: {
    instance: AnatomyInstanceToken;
    parent: AnatomyParentGetter;
    getPrototype: AnatomyPrototypeGetter;
    root: AnatomyRootTargetGetter;
    orderObserver?: AnatomyOrderObserver;
  }): CapsWiringBuilder;
  useAsTrigger(args: {
    instance: AsTriggerInstanceToken;
    parent: AsTriggerParentGetter;
    getPrototype: AsTriggerPrototypeGetter;
  }): CapsWiringBuilder;
  useFocus(args: {
    instance: FocusInstanceToken;
    parent: FocusParentGetter;
    root: FocusRootTargetGetter;
    isNativelyFocusable: FocusIsNativelyFocusable;
    setFocusable: FocusSetFocusable;
    requestFocus: FocusRequestFocus;
    blur: FocusBlur;
  }): CapsWiringBuilder;
  useRuleMeta(getMeta: RuleMetaGetter): CapsWiringBuilder;
  useRuleExposeStateWeb(args: {
    nativeVariantPolicy: RuleExposeStateWebNativeVariantPolicy;
  }): CapsWiringBuilder;
  usePresence(bridge: PresenceHostBridge): CapsWiringBuilder;
  useOverlay(args: { globalMount?: OverlayGlobalMount; modal?: OverlayModal }): CapsWiringBuilder;
  build(): WiringSpec;
};

export function createCapsWiring(): CapsWiringBuilder {
  const modules: WiringSpec = {};

  const add = (moduleName: string, provide: () => CapEntries) => {
    modules[moduleName] = provide as any;
    return api;
  };

  const api: CapsWiringBuilder = {
    add,

    useProps(source) {
      return add('props', () => [[RAW_PROPS_SOURCE_CAP, source]]);
    },

    useFeedback(effects) {
      return add('feedback', () => [[EFFECTS_CAP, effects]]);
    },

    useEventTargets({ root, global, emit }) {
      return add('event', () => [
        [EVENT_ROOT_TARGET_CAP, root],
        [EVENT_GLOBAL_TARGET_CAP, global],
        ...(emit ? [[EVENT_EMIT_CAP, emit] as const] : []),
      ]);
    },

    useExposeState(setExposes) {
      return add('expose-state', () => [[EXPOSE_SET_EXPOSES_CAP, setExposes]]);
    },

    useExposeStateWeb({ host, nameMap, mode }) {
      return add('expose-state-web', () => [
        [HOST_ELEMENT_CAP, host],
        [EXPOSE_STATE_WEB_MAP_CAP, nameMap],
        ...(mode ? [[EXPOSE_STATE_WEB_MODE_CAP, mode] as const] : []),
      ]);
    },

    useContext({ instance, parent }) {
      return add('context', () => [
        [CONTEXT_INSTANCE_TOKEN_CAP, instance],
        [CONTEXT_PARENT_CAP, parent],
      ]);
    },

    useAnatomy({ instance, parent, getPrototype, root, orderObserver }) {
      return add('anatomy', () => [
        [ANATOMY_INSTANCE_TOKEN_CAP, instance],
        [ANATOMY_PARENT_CAP, parent],
        [ANATOMY_GET_PROTO_CAP, getPrototype],
        [ANATOMY_ROOT_TARGET_CAP, root],
        ...(orderObserver ? [[ANATOMY_ORDER_OBSERVER_CAP, orderObserver] as const] : []),
      ]);
    },

    useAsTrigger({ instance, parent, getPrototype }) {
      return add('as-trigger', () => [
        [AS_TRIGGER_INSTANCE_CAP, instance],
        [AS_TRIGGER_PARENT_CAP, parent],
        [AS_TRIGGER_GET_PROTO_CAP, getPrototype],
      ]);
    },

    useFocus({ instance, parent, root, isNativelyFocusable, setFocusable, requestFocus, blur }) {
      return add('focus', () => [
        [FOCUS_INSTANCE_TOKEN_CAP, instance],
        [FOCUS_PARENT_CAP, parent],
        [FOCUS_ROOT_TARGET_CAP, root],
        [FOCUS_IS_NATIVELY_FOCUSABLE_CAP, isNativelyFocusable],
        [FOCUS_SET_FOCUSABLE_CAP, setFocusable],
        [FOCUS_REQUEST_FOCUS_CAP, requestFocus],
        [FOCUS_BLUR_CAP, blur],
      ]);
    },

    useRuleMeta(getMeta) {
      return add('rule-meta', () => [[RULE_META_GET_CAP, getMeta]]);
    },

    useRuleExposeStateWeb({ nativeVariantPolicy }) {
      return add('rule-expose-state-web', () => [
        [RULE_EXPOSE_STATE_WEB_NATIVE_VARIANT_POLICY_CAP, nativeVariantPolicy],
      ]);
    },

    usePresence(bridge) {
      return add('presence', () => [[PRESENCE_HOST_BRIDGE_CAP, bridge]]);
    },

    useOverlay({ globalMount, modal }) {
      return add('overlay', () => [
        ...(globalMount ? [[OVERLAY_GLOBAL_MOUNT_CAP, globalMount] as const] : []),
        ...(modal ? [[OVERLAY_MODAL_CAP, modal] as const] : []),
      ]);
    },

    build() {
      return modules;
    },
  };

  return api;
}
