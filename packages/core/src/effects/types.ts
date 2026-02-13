// packages/core/src/effects/types.ts
import { StyleHandle } from '../spec';

/**
 * EffectsPort (v0)
 * - accepts StyleHandle as IR
 * - host decides how to realize it
 * - MUST NOT trigger structural render/commit
 */
export interface EffectsPort {
  /**
   * Queue a merged style handle into host-side effect buffer.
   * Cheap, no structural commit.
   */
  queueStyle(handle: StyleHandle): void;

  /**
   * Request a flush tick to apply buffered effects to the current host element.
   * MUST NOT trigger structural commit.
   */
  requestFlush(): void;

  /**
   * Optional: flush immediately (useful for tests).
   */
  flushNow?(): void;
}
