# Watch Resolved Contract (v0)

This document defines the v0 behavioral contract for **resolved-level watchers** registered via:

- `def.props.watch(keys, cb)`
- `def.props.watchAll(cb)`

Resolved watchers observe **resolved props snapshots** (declared keys only).

---

## PROP-V0-3000 Scope

This contract covers:

- watcher registration constraints (setup-only handled elsewhere)
- when resolved watchers fire
- how changed keys are computed
- callback arguments and `WatchInfo` semantics
- hydration rule (first apply does not fire)

This contract does not cover:

- raw watchers (`watchRaw`, `watchRawAll`) — see watch-raw.v0.md
- scheduling (sync/async) guarantees beyond being invoked during `applyRaw()`

---

## PROP-V0-3100 Definitions

### Resolved Snapshot

- Obtained via `props.get()`
- Contains **only declared keys**
- Never contains `undefined`
- Shallowly immutable

### Change Detection

- Change detection uses `Object.is(prev[key], next[key])`
- A key is considered changed if `Object.is` returns false

---

## PROP-V0-3200 Hydration Rule

Resolved watchers must not fire on the **first** raw application performed by the runtime/adapter to hydrate props.

Formally:

- During the first `applyRaw(...)` after manager creation:
  - resolved watchers do not fire
  - raw watchers do not fire

Subsequent `applyRaw(...)` calls may trigger watchers.

> This rule ensures that initial mount / first commit is not polluted by watch callbacks.

---

## PROP-V0-3300 watchAll(cb)

### Trigger Condition

`watchAll` fires **only if at least one declared key changed** in resolved snapshot.

- If `changedKeysAll.length === 0`, `watchAll` does not run.

### Callback Arguments

`cb(run, next, prev, info)` where:

- `run` is the runtime RunHandle passed to `applyRaw(nextRaw, run)`
  - It MUST satisfy **PROP-V0-2110 (Handle Wiring)**: `run.props.get/getRaw/isProvided` must exist and behave consistently.
- `next` is the resolved snapshot after applying the new raw props
- `prev` is the resolved snapshot before applying the new raw props
- `info.changedKeysAll` is the list of all changed declared keys
- `info.changedKeysMatched` equals `info.changedKeysAll`

---

## PROP-V0-3400 watch(keys, cb)

### Key Constraints

- `keys` must be a non-empty array
- each key must be declared in the manager at registration time
- (setup-only restriction is enforced by runtime def handle)

### Trigger Condition

`watch(keys)` fires **only if at least one key in `keys` changed** in resolved snapshot.

- It does not fire for changes in undeclared keys (those never exist in resolved snapshot).
- It does not fire if only other declared keys changed but none of `keys` changed.

### Callback Arguments

`cb(run, next, prev, info)` where:

- `info.changedKeysAll` is the list of all changed declared keys
- `info.changedKeysMatched` is the subset of `keys` that changed

---

## PROP-V0-3500 Order of Invocation

On a watcher-firing `applyRaw(...)` call:

1. All `watchAll` callbacks are evaluated and may fire
2. All keyed `watch(keys)` callbacks are evaluated and may fire

Within each group:

- callbacks fire in registration order

> v0 does not guarantee a stable interleaving order between the two groups beyond the sequence above.

---

## PROP-V0-3600 Interaction with Resolution Semantics

Resolved watchers observe resolved snapshots after applying v0 resolution rules:

- only declared keys exist
- canonical empty is `null`
- values may come from fallback chain (prevValid/defaults/decl.default/null)
- invalid or empty raw input may not change resolved values if fallback keeps them stable

Therefore:

- A raw change does not necessarily imply a resolved change.
- Watchers fire based on **resolved differences**, not raw differences.

---

## PROP-V0-3700 No Observers Optimization (Non-Normative)

If there are no observers registered (no resolved watchers and no raw watchers), the manager may skip diff computation and callback invocation.

This is an implementation optimization and does not affect observable behavior.
