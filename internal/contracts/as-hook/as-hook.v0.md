# as-hook.v0.md (English)

> **Status**: Draft – v0 (contract-first)  
> **Version**: v0
>
> This document defines the **Proto UI asHook contract**:
> definition syntax, invocation/dedup rules, return shape, trace metadata,
> and the merge strategy with module APIs.
>
> **Positioning (v0)**: asHook is a “composable prototype form” for logic reuse.
> It has no subject-identity; its effects attach to the caller prototype.

---

## 0. Scope & Non-Goals

### 0.1 Scope (v0)

asHook in v0 provides:

- `defineAsHook(prototype)` to define an asHook prototype
- unified caller input/output semantics (named callers allowed)
- dedupe rule (same-name asHook runs once)
- baseline return shape (grouped by module)
- asHook trace (read-only, queryable)
- merge strategy with module APIs

### 0.2 Non-goals (v0)

The following are **out of scope** for v0:

- concrete implementation architecture (runtime/kernel/orchestrator)
- module-internal dedupe/merge strategies (module-owned)
- unified token aggregation layer (disposers + handles first)
- cross-language API design (separate documents)

---

## 1. Terminology

- **asHook Prototype**: a prototype defined by `defineAsHook`.
- **Caller Prototype**: the prototype that calls an asHook in its setup.
- **asHook Caller**: the function used to invoke an asHook (may include named sub-callers).
- **Module Result**: fields in asHook return object grouped by module (`state/context/event/...`).
- **Disposer**: a function/handle to cancel a side effect (unsubscribe, remove style, etc.).
- **Handle**: an operable handle for callers (e.g. BorrowedStateHandle).
- **asHook Trace**: read-only metadata recording asHook usage for diagnostics/semantics.
- **Privileged asHook**: official asHook that can use internal APIs (not produced by `defineAsHook`).

---

## 2. Definition & Naming

### 2.1 `defineAsHook(prototype)`

- Input: `prototype` with the same shape as `definePrototype` (`name`, `setup`).
- Output: an asHook prototype.
- Semantics:
  - asHook is still a prototype definition, but its **effects must attach to the caller prototype**.
  - asHook does not produce an independent subject.

### 2.2 Naming (v0 required)

- asHook `name` must match: `/^as[A-Z]/`.
- Non-conforming names must throw.

---

## 3. Caller & Arguments

### 3.1 Caller shape (v0)

- asHook is invoked via a **caller** function.
- Minimum shape:
  - `asX(options?)`
- Named sub-callers are allowed:
  - `asX.mode(options?)`

> Named caller creation is an implementation detail. This document only requires consistent input/output and behavior.

### 3.2 Phase constraints

- asHook caller **must be called in setup phase only**.
- Calling in runtime must throw.

---

## 4. Return Shape (AsHookResult)

### 4.1 Baseline shape (v0)

The asHook setup result must be an object aligned with def-handle style:

- `props`: module result (typically disposers)
- `state`: BorrowedStateHandle (or collection)
- `context`: module result (subscription/provide handles or disposers)
- `event`: module result (disposers)
- `feedback`: module result (disposers)
- `render`: optional render fragment
- **custom fields** are allowed

> Only `state` is required to be a Borrowed view; the projection is done via state module SPI.

### 4.2 Module result semantics

- `state`:
  - state handles introduced by asHook must be projected to Borrowed views.
- Other modules (`props/context/event/feedback/...`):
  - return values should be disposers by default.
  - handle/ability objects may be returned if the module contract allows.

### 4.3 Render fragment

- If `render` is returned, callers may compose it into their render.
- asHook must not directly trigger render commits.

---

## 5. Merge Strategy (Attach to Caller)

- All module results introduced by asHook (except state projection) **attach/merge into the caller prototype**.
- Module-level dedupe/merge policies are module-owned; asHook does not interfere.

---

## 6. Dedupe Rule (Same-name skip)

- Within one call chain, if the same-name asHook is introduced multiple times:
  - **only the first runs**, subsequent ones must be skipped
  - skipping must not throw

> This rule relies on name uniqueness as semantic identity.

---

## 7. Trace (Read-only)

- Caller prototype must expose an asHook trace (read-only).
- Trace must include at least:
  - asHook name
  - application order (or info sufficient to reconstruct order)
  - privileged flag
- Trace is readable externally but not writable.

---

## 8. Privileged asHook (Official)

- Privileged asHook is not created by `defineAsHook`.
- It may use internal APIs; its side effects **do not have to be revocable**.
- Trace must mark it as privileged.

---

## 9. Debt (v0 deferred)

- A unified token aggregation layer (for semantic tracing/visualization) is deferred.
- v0 only requires disposers + handles per module.

