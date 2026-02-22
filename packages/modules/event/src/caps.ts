// packages/modules/event/src/caps.ts
import { cap } from '@proto-ui/core';

export type EventTargetGetter = () => EventTarget | null;

export const EVENT_ROOT_TARGET_CAP = cap<EventTargetGetter>('@proto-ui/event/getRootTarget');

export const EVENT_GLOBAL_TARGET_CAP = cap<EventTargetGetter>('@proto-ui/event/getGlobalTarget');

export type EventEmitSink = (key: string, payload?: any, options?: Record<string, unknown>) => void;

export const EVENT_EMIT_CAP = cap<EventEmitSink>('@proto-ui/event/emit');
