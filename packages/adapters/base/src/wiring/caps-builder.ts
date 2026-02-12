// packages/adapters/base/src/wiring/caps-builder.ts
import type { CapEntries } from "@proto-ui/core";
import type { WiringSpec } from "../types";

import { RAW_PROPS_SOURCE_CAP, type RawPropsSource } from "@proto-ui/modules.props";
import { EFFECTS_CAP } from "@proto-ui/modules.feedback";
import {
  EVENT_GLOBAL_TARGET_CAP,
  EVENT_ROOT_TARGET_CAP,
  type EventTargetGetter,
} from "@proto-ui/modules.event";
import { EXPOSE_SET_EXPOSES_CAP, type ExposeHostSink } from "@proto-ui/modules.expose";
import {
  EXPOSE_STATE_WEB_MAP_CAP,
  EXPOSE_STATE_WEB_MODE_CAP,
  HOST_ELEMENT_CAP,
  type ExposeStateWebMode,
  type ExposeStateWebNameMap,
} from "@proto-ui/modules.expose-state-web";
import {
  CONTEXT_INSTANCE_TOKEN_CAP,
  CONTEXT_PARENT_CAP,
  type ContextParentGetter,
  type ContextInstanceToken,
} from "@proto-ui/modules.context";
import {
  AS_TRIGGER_GET_PROTO_CAP,
  AS_TRIGGER_INSTANCE_CAP,
  AS_TRIGGER_PARENT_CAP,
  type AsTriggerInstanceToken,
  type AsTriggerParentGetter,
  type AsTriggerPrototypeGetter,
} from "@proto-ui/modules.as-trigger";
import type { EffectsPort } from "@proto-ui/core";
import type { PropsBaseType } from "@proto-ui/types";

export type CapsWiringBuilder = {
  add(moduleName: string, provide: () => CapEntries): CapsWiringBuilder;
  useProps<P extends PropsBaseType>(source: RawPropsSource<P>): CapsWiringBuilder;
  useFeedback(effects: EffectsPort): CapsWiringBuilder;
  useEventTargets(args: {
    root: EventTargetGetter;
    global: EventTargetGetter;
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
  useAsTrigger(args: {
    instance: AsTriggerInstanceToken;
    parent: AsTriggerParentGetter;
    getPrototype: AsTriggerPrototypeGetter;
  }): CapsWiringBuilder;
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
      return add("props", () => [[RAW_PROPS_SOURCE_CAP, source]]);
    },

    useFeedback(effects) {
      return add("feedback", () => [[EFFECTS_CAP, effects]]);
    },

    useEventTargets({ root, global }) {
      return add("event", () => [
        [EVENT_ROOT_TARGET_CAP, root],
        [EVENT_GLOBAL_TARGET_CAP, global],
      ]);
    },

    useExposeState(setExposes) {
      return add("expose-state", () => [[EXPOSE_SET_EXPOSES_CAP, setExposes]]);
    },

    useExposeStateWeb({ host, nameMap, mode }) {
      return add("expose-state-web", () => [
        [HOST_ELEMENT_CAP, host],
        [EXPOSE_STATE_WEB_MAP_CAP, nameMap],
        ...(mode ? [[EXPOSE_STATE_WEB_MODE_CAP, mode] as const] : []),
      ]);
    },

    useContext({ instance, parent }) {
      return add("context", () => [
        [CONTEXT_INSTANCE_TOKEN_CAP, instance],
        [CONTEXT_PARENT_CAP, parent],
      ]);
    },

    useAsTrigger({ instance, parent, getPrototype }) {
      return add("as-trigger", () => [
        [AS_TRIGGER_INSTANCE_CAP, instance],
        [AS_TRIGGER_PARENT_CAP, parent],
        [AS_TRIGGER_GET_PROTO_CAP, getPrototype],
      ]);
    },

    build() {
      return modules;
    },
  };

  return api;
}
