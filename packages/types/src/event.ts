// packages/types/src/event.ts
export type CoreEventType =
  | 'press.start'
  | 'press.end'
  | 'press.cancel'
  | 'press.commit'
  | 'key.down'
  | 'key.up';

export type OptionalEventType =
  | 'pointer.down'
  | 'pointer.move'
  | 'pointer.up'
  | 'pointer.cancel'
  | 'pointer.enter'
  | 'pointer.leave'
  | 'nav.focus'
  | 'nav.blur'
  | 'text.focus'
  | 'text.blur'
  | 'input'
  | 'change'
  | 'context.menu';

export type ExtensionEventType = `native:${string}` | `host.${string}`;

export type EventTypeV0 = CoreEventType | OptionalEventType | ExtensionEventType;

export type EventListenerOptions = any;

declare const __eventTokenBrand: unique symbol;

export type EventTokenMeta = {
  kind: 'root' | 'global';
  type: string;
  options?: unknown;
  label?: string; // dev-only, set by desc()
};

export type EventListenerToken = {
  readonly [__eventTokenBrand]: 'EventListenerToken';
  readonly id: string;
  readonly meta: Readonly<EventTokenMeta>;
  desc(text: string): EventListenerToken;
};
