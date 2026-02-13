// packages/adapters/base/src/gate/event-gate.ts
export type EventGate = {
  enable(): void; // CP4
  disable(): void; // CP8
  isEnabled(): boolean;
  assertEnabled(hint?: string): void;
  dispose(): void;
};

export function createEventGate(): EventGate {
  let enabled = false;
  let disposed = false;

  return {
    enable() {
      if (disposed) return;
      enabled = true;
    },
    disable() {
      enabled = false;
    },
    isEnabled() {
      return enabled && !disposed;
    },
    assertEnabled(hint?: string) {
      if (!enabled || disposed) {
        throw new Error(`[EventGate] event is not effective${hint ? `: ${hint}` : ''}`);
      }
    },
    dispose() {
      disposed = true;
      enabled = false;
    },
  };
}
