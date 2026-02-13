# Watch Raw Contract (v0)

This document defines the v0 behavioral contract for **raw-level watchers** registered via:

- `def.props.watchRaw(keys, cb [, options])`
- `def.props.watchRawAll(cb [, options])`

Raw watchers observe **raw props objects** (the direct external input), before resolution/filtering.

Raw watching is an **escape hatch** and is discouraged in official prototypes.

---

## PROP-V0-4000 Scope

This contract covers:

- what raw watchers observe
- when raw watchers fire
- how changed keys are computed
- callback arguments and `WatchInfo` semantics
- hydration rule (first apply does not fire)
- warnings emitted by raw watchers

This contract does not cover:

- how raw props are produced by adapters (attr/property mapping etc.)
- resolved watchers (`watch`, `watchAll`) — see watch-resolved.v0.md

---

## PROP-V0-4100 Definitions

### Raw Snapshot

- Obtained via `props.getRaw()`
- Represents the exact input object provided to `applyRaw(nextRaw)`
- Is shallowly frozen (immutable by consumer)
- May contain:
  - undeclared keys
  - `undefined` values
  - any JS values (including functions/objects)

### Change Detection

- Change detection uses `Object.is(prev[key], next[key])`

---

## PROP-V0-4200 Hydration Rule

Raw watchers must not fire on the **first** `applyRaw(...)` after manager creation.

Formally:

- During the first `applyRaw(...)`:
  - raw watchers do not fire
  - resolved watchers do not fire

Subsequent `applyRaw(...)` calls may trigger raw watchers.

---

## PROP-V0-4300 watchRawAll(cb)

### Trigger Condition

`watchRawAll` fires **only when at least one raw key changed**.

- Keys are computed from the **union** of:
  - `Object.keys(prevRaw)`
  - `Object.keys(nextRaw)`

Let:

```ts
unionKeys = unique(keys(prevRaw) ∪ keys(nextRaw))
changedKeysAll = { k in unionKeys | Object.is(prevRaw[k], nextRaw[k]) is false }
```

Then:

- If `changedKeysAll.length === 0`, `watchRawAll` does not run.

### Callback Arguments

`cb(run, nextRaw, prevRaw, info)` where:

- `run` is the runtime RunHandle passed to `applyRaw(nextRaw, run)`
  - It MUST satisfy **PROP-V0-2110 (Handle Wiring)**: `run.props.get/getRaw/isProvided` must exist and behave consistently.

- `nextRaw` is the raw snapshot after applying new raw props
- `prevRaw` is the raw snapshot before applying new raw props
- `info.changedKeysAll` is `changedKeysAll`
- `info.changedKeysMatched` equals `info.changedKeysAll`

---

## PROP-V0-4400 watchRaw(keys, cb)

### Key Constraints

- `keys` must be a non-empty array
- Unlike resolved watchers, keys are **not required** to be declared
- (setup-only restriction is enforced by runtime def handle)

### Trigger Condition

`watchRaw(keys)` fires **only if at least one key in `keys` changed**.

Let:

```ts
changedKeysMatched = { k in keys | Object.is(prevRaw[k], nextRaw[k]) is false }
changedKeysAll = computed from unionKeys as in watchRawAll
```

Then:

- If `changedKeysMatched.length === 0`, the callback does not run.
- Otherwise, callback runs with both `changedKeysAll` and `changedKeysMatched`.

### Callback Arguments

`cb(run, nextRaw, prevRaw, info)` with:

- `run` is the runtime RunHandle passed to `applyRaw(nextRaw, run)`
  - It MUST satisfy **PROP-V0-2110 (Handle Wiring)**: `run.props.get/getRaw/isProvided` must exist and behave consistently.

- `info.changedKeysAll` computed from unionKeys
- `info.changedKeysMatched` computed from provided `keys`

---

## PROP-V0-4500 Warnings & Discouragement

Raw watching is an escape hatch and should be avoided in official prototypes.

### Warning emission (v0)

When a raw watcher is evaluated in a watcher-firing `applyRaw(...)` call:

- `watchRawAll` may record a warning diagnostic:
  - `[Props] watchRawAll() is an escape hatch; avoid in official prototypes.`

- `watchRaw(keys)` may record a warning diagnostic:
  - `[Props] watchRaw() is an escape hatch; avoid in official prototypes.`

This warning emission is controlled by an internal `devWarn` flag.

Default behavior in v0:

- `devWarn` defaults to `true` for raw watchers registered via DefHandle APIs.

> The warning is recorded when the watcher group is visited on an apply call. It is not required to be de-duplicated in v0.

---

## PROP-V0-4600 Order of Invocation

On a watcher-firing `applyRaw(...)` call:

1. Raw watchers are evaluated and may fire
2. Resolved watchers are evaluated and may fire

Within raw watchers:

1. `watchRawAll` callbacks are evaluated first (may fire)
2. `watchRaw(keys)` callbacks are evaluated next (may fire)

Within each group:

- callbacks fire in registration order

---

## PROP-V0-4700 Raw vs Resolved Semantics

Raw watchers fire based on **raw diffs**, not resolved diffs.

Therefore:

- A change that does not affect resolved output may still trigger raw watchers.
- A resolved change always implies some raw change, but raw watchers are not limited to declared keys.

This escape hatch exists to support integration with ecosystems that provide complex or opaque props payloads.

---

## PROP-V0-4800 No Observers Optimization (Non-Normative)

If there are no observers registered, the manager may skip diff computation.

This is an implementation optimization and does not affect observable behavior.
