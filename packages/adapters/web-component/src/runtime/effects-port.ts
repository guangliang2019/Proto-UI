import type { EffectsPort, StyleHandle } from '@proto-ui/core';

import { type OwnedTokenApplier } from '../feedback-style';

export function createWebEffectsPort(applier: OwnedTokenApplier): EffectsPort {
  let latest: StyleHandle | null = null;
  let flushing = false;

  const flush = () => {
    if (flushing) return;
    flushing = true;
    try {
      const handle = latest;
      if (!handle) return;
      if (handle.kind === 'tw') applier.apply(handle.tokens);
    } finally {
      flushing = false;
    }
  };

  return {
    queueStyle(handle) {
      latest = handle;
    },
    requestFlush() {
      flush();
    },
    flushNow() {
      flush();
    },
  };
}
