# focus-group.v0.md

> Status: Draft - v0
>
> This document defines the v0 contract for `asFocusGroup(...)`.

---

## 0. Positioning

`asFocusGroup(...)` declares that the current prototype instance participates in **group-local focus navigation**.

It is responsible for:

- configuring local navigation policy
- exposing next/prev/selected-style movement commands
- representing focus-group semantics independently of scope boundaries

It is not responsible for:

- trap or restore behavior
- scope/container entry policy
- making child nodes focusable by itself

---

## 1. Relationship to FocusScope

`asFocusGroup(...)` is a sibling privileged asHook to `asFocusScope(...)`.

- a focus scope may internally use a focus group
- a focus group may exist without declaring a focus scope boundary

`asFocusScope(...)` may expose its internal group as a convenience surface, but that does not replace the standalone group abstraction.

---

## 2. v0 Capabilities

v0 should minimally support:

- `navigation`
  - `none | tab | arrow | tab+arrow`
- `orientation`
  - `vertical | horizontal | both`
- `loop`
- `entry`
  - `first | selected | active | manual`
- `selectOnFocus`

---

## 3. Return Handle

`asFocusGroup(...)` should return a `FocusGroupHandle`-like object.

Example shape:

```ts
type FocusGroupHandle = {
  active: ObservedStateHandle<boolean, any>;
  hasFocused: ObservedStateHandle<boolean, any>;

  focusFirst(): void;
  focusLast(): void;
  focusNext(): void;
  focusPrev(): void;
  focusSelected(): void;

  configure(patch: FocusGroupConfigPatch): void;
};
```

---

## 4. Non-Goals

v0 does not require:

- typeahead
- grid navigation
- activeDescendant public protocol
- cross-group querying
