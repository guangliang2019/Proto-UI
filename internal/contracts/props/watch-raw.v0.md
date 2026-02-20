# Watch Raw Contract (v0)

This document defines the v0 behavior for raw-level watchers registered via:

- `def.props.watchRaw(keys, cb)`
- `def.props.watchRawAll(cb)`

Raw watching is an escape hatch.

---

## 1. Definitions

- **raw snapshot**: from `props.getRaw()`
  - may include undeclared keys
  - may include `undefined`
  - shallowly frozen

- **change detection**: `Object.is(prev[key], next[key])`

---

## 2. Hydration Rule

During the first `applyRaw(...)` (hydration):

- raw watchers do not fire
- resolved watchers do not fire

---

## 3. watchRawAll(cb)

Trigger:

- union keys = `keys(prevRaw) ∪ keys(nextRaw)`
- fires only if at least one union key changed

Callback:

- `cb(run, nextRaw, prevRaw, info)`
- `info.changedKeysAll`: changed keys in union
- `info.changedKeysMatched === info.changedKeysAll`

---

## 4. watchRaw(keys, cb)

Registration constraints:

- keys must be non-empty
- keys do **not** have to be declared

Trigger:

- fires only if at least one key in `keys` changed in raw

Callback:

- `info.changedKeysAll`: changed keys in union
- `info.changedKeysMatched`: subset of `keys` that changed

---

## 5. Invocation Order

For a watcher-firing `applyRaw(...)`:

1. raw watchers before resolved watchers
2. within raw watchers: `watchRawAll` then `watchRaw(keys)` (both in registration order)

---

## 6. Warning Requirement (escape hatch)

When raw watchers are evaluated in a watcher-firing apply call, record dev warnings (configurable):

- `watchRawAll()`: `[Props] watchRawAll() is an escape hatch; avoid in official prototypes.`
- `watchRaw(keys)`: `[Props] watchRaw() is an escape hatch; avoid in official prototypes.`
