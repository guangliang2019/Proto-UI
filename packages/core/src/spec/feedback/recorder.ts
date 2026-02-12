// packages/core/src/spec/feedback/recorder.ts

import type { StyleHandle } from "./style";
import { mergeTwTokensV0 } from "./semantic-merge";
import { assertTwTokenV0 } from "./tokens";

export type UnUse = () => void;

type Chunk = {
  id: number;
  tokens: string[]; // flattened tw tokens in order
  removed: boolean;
};

export class FeedbackStyleRecorder {
  private nextId = 1;
  private chunks: Chunk[] = [];

  /**
   * setup-only: record style intent tokens (tw handles only)
   */
  use(...handles: StyleHandle[]): UnUse {
    // flatten & validate
    const flattened: string[] = [];
    for (const h of handles) {
      if (!h || h.kind !== "tw" || !Array.isArray(h.tokens)) {
        throw new Error(`[feedback] unsupported style handle in v0`);
      }
      for (const t of h.tokens) {
        assertTwTokenV0(t, "feedback.style.use");
        flattened.push(t);
      }
    }

    const chunk: Chunk = {
      id: this.nextId++,
      tokens: flattened,
      removed: false,
    };

    this.chunks.push(chunk);

    const unUse: UnUse = () => {
      chunk.removed = true;
    };

    return unUse;
  }

  /**
   * internal: record style tokens without v0 tw validation.
   * Used by rule extensions that generate selector-based tokens.
   */
  useUnsafe(...handles: StyleHandle[]): UnUse {
    const flattened: string[] = [];
    for (const h of handles) {
      if (!h || h.kind !== "tw" || !Array.isArray(h.tokens)) {
        throw new Error(`[feedback] unsupported style handle in v0`);
      }
      for (const t of h.tokens) {
        if (typeof t !== "string" || !t) {
          throw new Error(`[feedback] invalid tw token (unsafe): empty`);
        }
        flattened.push(t);
      }
    }

    const chunk: Chunk = {
      id: this.nextId++,
      tokens: flattened,
      removed: false,
    };

    this.chunks.push(chunk);

    const unUse: UnUse = () => {
      chunk.removed = true;
    };

    return unUse;
  }

  /**
   * Export a semantic snapshot of merged tokens.
   *
   * v0 recommendation: export is allowed in any phase (pure snapshot).
   */
  export(): { tokens: string[] } {
    const inputs: string[] = [];
    for (const c of this.chunks) {
      if (c.removed) continue;
      inputs.push(...c.tokens);
    }
    return mergeTwTokensV0(inputs);
  }
}
