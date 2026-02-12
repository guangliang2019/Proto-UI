# Resolve & Fallback Contract (v0)

This document defines how raw props are resolved into runtime-visible props
and how empty or invalid values are handled.

---

## PROP-V0-2000 Input Classification

For each declared prop key, raw input is classified into one of the following states:

- **missing**  
  The key is not present on the raw props object.

- **provided-empty**  
  The key is present, but its value is `null` or `undefined`.

- **provided-non-empty**  
  The key is present and its value is neither `null` nor `undefined`.

- **invalid**  
  A provided-non-empty value that fails validation
  (kind / enum / range / validator).

---

## PROP-V0-2100 Public Runtime APIs

### get()

- Returns a snapshot of resolved props
- Contains **only declared keys**
- Never contains `undefined`
- Snapshot is shallowly immutable

### getRaw()

- Returns the raw props object as provided
- May contain undeclared keys
- May contain `undefined`

### isProvided(key)

- Returns `true` if the key exists as an **own property** on raw props
- Value may be `undefined`

---

## PROP-V0-2110 Handle Wiring

The public runtime APIs described in **PROP-V0-2100** MUST be reachable through
phase handles, not only on internal managers.

### Requirements

- In **callback-time**, the `run` parameter passed into any props watcher callback
  (resolved or raw) MUST provide:

  - `run.props.get()`
  - `run.props.getRaw()`
  - `run.props.isProvided(key)`

- In **render-time**, the readonly handle `read.props` MUST provide the same API
  surface as `run.props` (it is typed as `RunHandle["props"]`).

### Behavioral Alignment

Within a single callback invocation:

- For resolved watchers `cb(run, next, prev, info)`, `run.props.get()` MUST be
  behaviorally equivalent to `next`.

- For raw watchers `cb(run, nextRaw, prevRaw, info)`, `run.props.getRaw()` MUST be
  behaviorally equivalent to `nextRaw`.

“Behaviorally equivalent” means: deep-equal values for all keys, and the same key
set under the contract rules. Implementations may or may not return the same object
identity.

---

## PROP-V0-2200 Resolved Output Invariants

- Resolved props **never contain `undefined`**
- Canonical empty value is `null`
- All declared keys are always present in resolved snapshot

---

## PROP-V0-2300 EmptyBehavior: `accept`

- `accept` applies **only to provided-empty input**
- When input is provided-empty, resolved value becomes `null`
- `accept` does **not** apply to missing input
- Missing input continues to follow fallback semantics
- Invalid provided-non-empty input does **not** become `null`
  and follows fallback or error rules

---

## PROP-V0-2400 EmptyBehavior: `fallback` (default)

When EmptyBehavior is `fallback`:

- missing input → fallback
- provided-empty input → fallback
- invalid input → fallback

Fallback chain order:

1. Previous valid value (`prevValid`)
2. Defaults stack (`setDefaults`, latest-first)
3. Declaration default (`decl.default`)
4. Canonical empty (`null`)

---

## PROP-V0-2500 EmptyBehavior: `error`

When EmptyBehavior is `error`:

- missing input → error unless a valid fallback exists
- provided-empty input → error unless a valid fallback exists
- invalid input → error unless a valid fallback exists

Fallback selection rules:

- Only **non-empty and valid** values are acceptable
- If no such fallback exists, resolution **must throw**

---

## PROP-V0-2600 Previous Valid Value (`prevValid`)

- `prevValid` records only **non-empty and valid** resolved values
- `null` is never written to `prevValid`
- Invalid input does not update `prevValid`

---

## PROP-V0-2700 Validation Semantics (v0)

Validation is applied only to provided-non-empty input.

### Kind Checks (minimal)

- `boolean` → `typeof v === "boolean"`
- `string` → `typeof v === "string"`
- `number` → `typeof v === "number" && !Number.isNaN(v)`
- `object` → `typeof v === "object"`
- `any` → always valid

> `null` is handled by EmptyBehavior and never reaches kind validation.

### enum / range / validator

- enum failure → invalid
- range failure → invalid
- validator returns false or throws → invalid

Invalid values participate in fallback or error handling,
depending on EmptyBehavior.

---

## PROP-V0-2800 Type Portability Boundary

Props v0 intentionally avoids defining a strict type system.

- Validation rules are **minimal and permissive**
- Complex types are allowed but not standardized
- No guarantees are made about how complex values are passed
  across different adapters or platforms

This boundary is considered a **deliberate v0 limitation**.
