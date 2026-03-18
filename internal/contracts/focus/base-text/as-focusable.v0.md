# as-focusable.v0.md

> Status: Draft - v0
>
> This document defines the v0 contract for `asFocusable(...)`.

---

## 0. Positioning

`asFocusable(...)` declares that the current prototype instance participates as a **focus node**.

It is responsible for:

- registering the current instance as a focusable node
- receiving system-owned focus facts
- providing minimal focus commands
- optionally joining a focus scope

It is **not** responsible for:

- choosing the next/previous focus target
- trap/restore policy
- scope-wide navigation

---

## 1. Invocation Model

`asFocusable(...)` is a privileged, configurable, singleton-install asHook.

- the first call installs the focusable capability
- later calls must reuse the same underlying handle
- repeated calls may contribute setup-time configuration patches
- repeated calls must not reinstall the focusable capability

---

## 2. Initial Parameters

Initial parameters should be optional by default.

v0 intent:

- `asFocusable()` with no arguments should be valid
- fields that can be configured later in setup should not be init-required

Possible late-configurable fields include:

- `scopeKey`
- `autoFocus`
- `disabled`
- `navParticipation`
- `meta`

Any field that must be init-required in the future must be explicitly justified by structure or safety constraints.

---

## 3. Scope Membership

Scope membership is explicit by default.

- a focusable joins a focus scope through a token-style `scopeKey`
- `scopeKey` is a structural membership token, not an arbitrary query id

If no `scopeKey` is provided:

- runtime may apply fallback local behavior
- but such fallback is non-structural
- composite widget semantics must not rely on it

---

## 4. Return Handle

`asFocusable(...)` should return a `FocusableHandle`-like object.

Its v0 surface should minimally allow:

- reading focus facts
- issuing focus requests
- setup-only configuration refinement

Example shape:

```ts
type FocusableHandle = {
  focused: ObservedStateHandle<boolean, any>;
  focusVisible: ObservedStateHandle<boolean, any>;
  focusable: ObservedStateHandle<boolean, any>;

  focus(options?: FocusRequestOptions): void;
  blur(): void;
  isFocused(): boolean;

  configure(patch: FocusableConfigPatch): void;
};
```

`configure(...)` must be setup-only.

---

## 5. Repeated Configuration

When `asFocusable(...)` is called multiple times in setup:

- installation must remain singleton-like
- setup-time configuration may be merged deterministically
- later compatible fields may override earlier compatible fields
- unsafe conflicts must throw, or at minimum emit a clear warning

v0 should prefer explicit configuration merge over repeated side-effectful installation.

---

## 6. Projection Boundary

`asFocusable(...)` may project to:

- interaction-derived state such as `focused`
- outward expose methods such as `focus()`

But the hook itself is the primary authoring boundary for focus-node semantics.

---

## 7. Non-Goals

v0 does not require `asFocusable(...)` to expose:

- arbitrary member lookup
- next/prev navigation
- scope registry internals
- implementation-specific host objects
