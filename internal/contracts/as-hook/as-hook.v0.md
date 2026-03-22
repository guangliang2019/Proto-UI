# as-hook.v0.md (English)

> **Status**: Draft – v0 (contract-first) **Version**: v0
>
> This document defines the **Proto UI asHook contract**: asHook definition syntax, calling and dedupe rules, return shape, trace metadata, and merge strategy with module APIs.
>
> **Positioning (v0)**: an asHook is a "composable prototype form" used for logic reuse; it has no independent subjecthood, and its effects attach to the calling prototype.

---

## 0. Scope and Non-Goals

### 0.1 Scope (v0)

asHook in v0 provides:

- `defineAsHook(prototype)` to define an asHook prototype
- a unified input/output model for asHook callers
- dedupe rules
- a baseline return shape
- asHook trace metadata
- merge strategy between asHook effects and module APIs

### 0.2 Non-Goals (v0)

The following are **not** v0 goals:

- the concrete implementation architecture of asHook
- per-module dedupe/merge strategy details
- a unified token aggregation layer
- cross-language API design

---

## 1. Terms

- **asHook Prototype**: a prototype defined through `defineAsHook`.
- **Caller Prototype**: a prototype whose setup calls an asHook.
- **asHook Caller**: the function used to invoke an asHook.
- **Module Result**: a module-oriented field in an asHook return value.
- **disposer**: a function/handle that undoes a side effect.
- **handle**: a handle the caller may use.
- **asHook Trace**: readonly metadata describing applied asHooks.
- **Privileged asHook**: an official built-in asHook that may use internal APIs.

---

## 2. Definition and Naming

### 2.1 `defineAsHook(prototype)`

- Input: `prototype`, shaped like `definePrototype`.
- `setup` must return `RenderFn | void`.
- Output: an asHook prototype.
- Semantics:
  - asHook is still a prototype definition
  - its effects must attach to the calling prototype
  - it does not create an independent subject

### 2.1.1 Parameterized authored asHook (proposed direction)

For authored asHooks, Proto UI may support:

- `setup(def, options?)`
- caller shape:
  - `asX()`
  - `asX(options)`

This does **not** change the prototype nature of asHook:

- `setup` remains the prototype setup entry
- `setup` return value remains reserved for `RenderFn | void`
- options only make the hook logic configurable

This capability is intended primarily for tool-like and strategy-like asHooks, such as:

- `asEscapeKey(options)`
- `asOpenState(options)`
- `asCommitClose(options)`

It should not require authors to fall back to ad-hoc `(def, options) => { ... }` helpers merely to support setup-time configuration.

### 2.2 Naming Rule (v0, mandatory)

- asHook `name` must match `/^as[A-Z]/`.
- Violations must throw.

---

## 3. Caller and Invocation

### 3.1 Caller Shape (v0)

- asHook is invoked via a caller.
- The minimal form is:
  - `asX()`
- Named sub-callers are allowed:
  - `asX.mode()`

### 3.1.1 Parameterized caller shape (proposed direction)

When an authored asHook declares options, the caller should support:

- `asX(options)`

This option-passing model should remain setup-only.

The existence of options should not change the authoring classification of the hook:

- it is still an asHook
- it is still setup-only
- its effects still attach to the caller prototype

### 3.2 Runtime Constraint

- an asHook caller may only be used during setup
- calling it during runtime must throw

---

## 4. Return Shape (`AsHookResult`)

### 4.1 Baseline Shape (v0)

`AsHookResult` is the return value of the **asHook caller**, not the authored prototype setup result.

It must be an object and may contain:

- `props`
- `state`
- `context`
- `event`
- `feedback`
- `render`
- custom fields

Only `state` is required to be projected as Borrowed view.

### 4.2 Module Result Constraints

- `state`
  - state handles introduced by asHook must be projected as Borrowed handles
- other modules
  - should primarily return disposers
  - may also return module-specific handles/capabilities

### 4.3 Render Fragment

- if `render` exists, the caller may compose it into its render
- asHook does not directly trigger render commit

---

## 5. Merge Strategy

- all asHook-introduced module results attach to the caller prototype
- module-level conflict handling is owned by each module

---

## 6. Dedupe Rules

### 6.1 Default Rule

- within one call chain, repeated use of the same named asHook:
  - only the first application takes effect
  - later identical names are skipped
  - skipping must not throw

### 6.2 Exception: Configurable Privileged asHooks

v0 may define a class of **configurable privileged asHooks** (for example, a future focus system):

- installation is singleton-like
- repeated calls must not reinstall the same system capability
- repeated calls may still contribute setup-time configuration patches

For this class:

- runtime should reuse the same underlying handle / installation result
- newly supplied configuration should be merged deterministically according to the hook contract
- later configuration may override earlier configuration only for fields explicitly allowed to be late-configured
- unsafe conflicts must throw, or at minimum produce a clear warning

This exception does not apply to normal `defineAsHook(...)` products.

### 6.3 Unified authored mode model (proposed direction)

To make authored asHooks usable as the mainstream logic-reuse entry, Proto UI may unify authored and privileged asHooks under explicit installation modes.

Proposed modes:

- `configurable`
- `once`
- `multiple`

Intended meaning:

- `configurable`
  - install once
  - allow repeated setup-time calls with options/config patches
  - later calls do not reinstall the whole hook
  - later calls route into a hook-defined configuration path

- `once`
  - repeated same-name calls are skipped
  - effectively a degenerate form of configurable hook with no useful patch surface

- `multiple`
  - each call is a distinct installation
  - no singleton-like reuse is assumed

This model is intended to reduce the semantic gap between:

- privileged configurable hooks such as `asFocusable(...)` / `asFocusScope(...)`
- future parameterized authored hooks such as `asEscapeKey(options)`

The preferred mainstream mode is expected to be `configurable`, while:

- `once` is appropriate for install-only hooks
- `multiple` should remain uncommon and explicit

### 6.4 `setup` and `configure` split (proposed direction)

To avoid overloading prototype `setup` with both install-time and patch-time logic, a configurable asHook may eventually support a definition split such as:

- `setup(def, options?)`
- `configure(configApi, options, tools)`

Intent:

- `setup` remains clean and prototype-shaped
- `setup` still returns only `RenderFn | void`
- `configure` is the hook-specific patch/merge entry
- repeated configurable calls should prefer `configure(...)` over rerunning arbitrary install logic

Important boundary:

- `configure(...)` should not receive unrestricted `def`
- otherwise configurable hooks would reintroduce duplicate-install hazards through a different path

Instead, `configure(...)` should receive a restricted hook-owned configuration surface and utilities such as:

- merge allowed field
- reject non-mergeable field
- warn on override
- throw on unsafe conflict

This is especially important for hooks where:

- some fields are late-configurable
- some fields are singleton-defining
- some fields are entirely non-mergeable

### 6.5 Mergeability classes (proposed direction)

For configurable hooks, fields may naturally fall into categories:

- fully mergeable
- partially mergeable
- non-mergeable

Typical interpretations:

- fully mergeable
  - later options may deterministically replace or merge earlier values

- partially mergeable
  - some fields may merge
  - some fields may warn or throw on conflict

- non-mergeable
  - repeated configuration with incompatible values should fail clearly

This classification should be owned by the hook contract itself rather than hidden in runtime heuristics.

---

## 7. Trace

- caller prototypes must retain readonly asHook trace metadata
- trace must contain at least:
  - asHook name
  - application order
  - privileged marker

---

## 8. Privileged asHooks

- privileged asHooks are not created by `defineAsHook`
- privileged asHooks may use internal APIs
- trace must mark them as privileged
- when a privileged asHook is configurable, its return handle should prefer exposing setup-only reconfiguration capability, or an equivalent configuration patch entry

---

## 9. Debt (v0 deferred)

- a unified token aggregation layer remains deferred
- v0 only requires disposers and handles
