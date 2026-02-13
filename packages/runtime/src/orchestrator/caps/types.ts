// packages/runtime/src/orchestrator/caps/types.ts
import type { CapEntries } from '@proto-ui/core';

export interface CapsController {
  attach(entries: CapEntries): void;
  reset(): void;
}
