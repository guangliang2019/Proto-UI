// packages/modules/event/src/caps.ts
import { cap } from '@proto-ui/core';

export type EventTargetGetter = () => EventTarget | null;

export const EVENT_ROOT_TARGET_CAP = cap<EventTargetGetter>('@proto-ui/event/getRootTarget');

export const EVENT_GLOBAL_TARGET_CAP = cap<EventTargetGetter>('@proto-ui/event/getGlobalTarget');
