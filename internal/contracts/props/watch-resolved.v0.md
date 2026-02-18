# Watch Resolved Contract (v0)

This document defines the v0 behavior for resolved-level watchers registered via:

- `def.props.watch(keys, cb)`
- `def.props.watchAll(cb)`

---

## 1. Definitions

- **resolved snapshot**: from `props.get()`
  - declared keys only
  - no `undefined`
  - shallowly frozen

- **change detection**: `Object.is(prev[key], next[key])`

---

## 2. Hydration Rule

During the first `applyRaw(...)` (hydration):

- resolved watchers do not fire
- raw watchers do not fire

---

## 3. watchAll(cb)

Trigger:

- fires only if **at least one declared key changes** in resolved snapshot

Callback:

- `cb(run, next, prev, info)`
- `info.changedKeysAll`: all changed declared keys
- `info.changedKeysMatched === info.changedKeysAll`

---

## 4. watch(keys, cb)

Registration constraints:

- keys must be non-empty
- keys must be declared

Trigger:

- fires only if at least one key in `keys` changes in resolved snapshot

Callback:

- `info.changedKeysAll`: all changed declared keys
- `info.changedKeysMatched`: subset of keys that changed

---

## 5. Invocation Order

For a watcher-firing `applyRaw(...)`:

1. `watchAll` callbacks (registration order)
2. `watch(keys)` callbacks (registration order)

---

## 6. Relation to Resolution

Resolved watchers observe **resolved snapshots**:

- raw changes may not cause resolved changes
- watchers are triggered by resolved diffs only
