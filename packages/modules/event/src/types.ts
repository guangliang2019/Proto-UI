// packages/modules/event/src/types.ts
import type { ModuleInstance } from '@proto-ui/core';
import type { ModulePort } from '@proto-ui/core';
import { EventListenerToken, EventTypeV0 } from '@proto-ui/types';

export type EventDispatch = (id: string, ev: any) => void;

export type EventFacade = {
  // --- setup-only registration (opaque to module) ---
  on(type: EventTypeV0, options?: EventListenerOptions): EventListenerToken;
  onGlobal(type: EventTypeV0, options?: EventListenerOptions): EventListenerToken;

  /** precise removal */
  off(token: EventListenerToken): void;
};

export type EventModule = ModuleInstance<EventFacade> & {
  name: 'event';
  scope: 'instance';
};

export type EventPort = ModulePort & {
  /**
   * Bind all registered listeners using current targets.
   * Runtime supplies a dispatcher to handle invocation semantics.
   */
  bind(dispatch: EventDispatch): void;

  /** Unbind all currently bound listeners (registrations kept) */
  unbind(): void;

  /** Optional diagnostics hook */
  getDiagnostics?(): readonly EventDiag[];

  /**
   * Setup-only: redirect all "root" bindings to a specified target-like.
   * Does NOT affect global registrations.
   */
  redirectRoot(target: EventTarget): void;
};

export type EventDiag = {
  id: string;
  kind: 'root' | 'global';
  type: string;
  bound: boolean;
  label?: string;
};
