## CONTRACT_DEBT(v0): feedback.flush.runtime

### Problem
`feedback` runtime flush is currently forced to call `requestFlush()` on every dirty change.

This was required to fix a bug where:
- `feedback.useStyleRuntime()` queues styles, but
- `flushRequested` never resets (no `onEffectsFlushed()` signal from adapter),
so subsequent runtime style changes were queued but never flushed to host.

### Current behavior (v0)
- `flushIfPossible()` always calls `requestFlush()` when `dirty` is true.
- No adapter signal (`onEffectsFlushed`) is required to keep runtime updates working.

### Risk / tradeoff
- Potential extra flush calls compared to a gated `flushRequested` design.
- Lack of explicit feedback/ack from adapter about flush completion.

### Desired direction
Define a stable runtime flush lifecycle:
- Adapter (or host effects port) should report when a flush actually completed.
- `feedback` should be able to clear `flushRequested` on completion.
- Avoid redundant flush calls while guaranteeing all queued runtime styles are applied.

### Acceptance criteria (for closing this debt)
1. A formal contract exists for `effects.requestFlush()` and a completion signal.
2. `feedback` restores a gated flush strategy (no unconditional flush storms).
3. Rule-driven runtime style updates remain reliable without relying on extra `update()` cycles.
