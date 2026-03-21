# focus-scope.v0.md

> Status: Draft - v0
>
> This document defines the v0 contract for `asFocusScope(...)`.

---

## 0. Positioning

`asFocusScope(...)` declares that the current prototype instance forms a **focus coordination boundary**.

It is responsible for:

- defining a local focus boundary
- applying entry and restore policies
- handling trap/loop behavior where supported
- optionally coordinating an internal focus group

It is not responsible for:

- making a child node focusable by itself
- exposing registry internals to authors
- replacing generic event/state/expose systems

---

## 1. Why It Exists

FocusScope is required because many common widgets need local focus governance:

- overlay content
- select/listbox/menu content
- dialog/popover content
- composite tab/list structures with boundary semantics

Routine local navigation should not require authors to manually script focus movement for every widget.

---

## 2. Invocation Model

`asFocusScope(...)` is a privileged, configurable, singleton-install asHook.

- first call installs the scope capability
- later calls reuse the same underlying handle
- repeated setup calls may contribute configuration patches
- repeated calls must not reinstall the scope

Initial parameters should be optional by default.

---

## 3. Scope Key

A focus scope may declare a token-style key.

- the key expresses structural membership identity
- it is not a free-form query id
- metadata may later be attached to the token

v0 intent:

- `key` should be allowed to participate in setup-time configuration
- if future implementation imposes locking behavior, that lock boundary must be explicit

---

## 4. v0 Capabilities

v0 should minimally support:

- `entry`
  - examples: `first | selected | active | container | manual`

- `restore`
  - examples: `previous | trigger | none`

- `trap`

- `emptyPolicy`
  - at least `container | none`

- optional group composition
  - a scope may carry an internal `asFocusGroup(...)`-style capability

These policies should cover common component-library scenarios without forcing manual focus scripting.

---

## 5. Return Handle

`asFocusScope(...)` should return a `FocusScopeHandle`-like object.

Example shape:

```ts
type FocusScopeHandle = {
  active: ObservedStateHandle<boolean, any>;
  hasFocused: ObservedStateHandle<boolean, any>;

  focusFirst(): void;
  focusLast(): void;
  focusNext(): void;
  focusPrev(): void;
  focusSelected(): void;
  restoreFocus(): void;

  configure(patch: FocusScopeConfigPatch): void;
  getGroup(): FocusGroupHandle | null;
};
```

`configure(...)` must be setup-only.

The handle should expose structured focus commands rather than arbitrary instance lookup.

---

## 6. Navigation Principle

FocusScope is responsible for **boundary-level local focus resolution**.

Authors may influence policy, but should not need to manually script routine boundary entry/restore such as:

- selected-item entry on overlay open
- trigger restoration on overlay close

Routine next/previous item navigation may be delegated to a focus group capability.

---

## 7. Context Boundary

FocusScope may internally use contextual relationships, but its core governance should not be modeled as ordinary public `context`.

The primary runtime foundation should be a dedicated focus system/module.

Context, if used, should be considered a projection or helper layer rather than the governance core.

---

## 8. Non-Goals

v0 does not require:

- grid navigation
- typeahead
- activeDescendant public API
- arbitrary cross-scope lookup
- a single host-agnostic implementation technique
