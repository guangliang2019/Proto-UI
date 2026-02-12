# expose-state.v0.md

> Status: Draft – v0
>
> This contract defines **expose-state** in Proto UI v0:
> a component exposes an internal state slot as an **external state handle** to the App Maker
> via `def.expose`.
>
> **Positioning (v0):** expose-state is a “same-source, different-handle” output projection.
> The external handle is **not** the same object as internal state handles,
> but it reads from the same state slot.

---

## 0. Scope and Non-goals

### 0.1 Scope (v0)

Expose-state in v0 provides:

- setup-time `def.expose(key, value)` over internal state handle views
- minimum shape requirements for the App Maker external state handle
- same-source consistency between internal state and external handle
- responsibility boundaries between expose and adapters
- lifecycle constraints and minimal error model

### 0.2 Non-goals (v0)

v0 explicitly does not provide or guarantee:

- any external write capability (`set`)
- reactive rendering, dependency tracking, or automatic updates
- strict constraints on adapter extensions beyond the minimum shape

---

## 1. Terminology

- **Internal State Handle**: Proto UI internal state handle view (Owned/Borrowed/Observed).
- **External State Handle**: the App Maker-facing state handle with a minimal API shape.
- **State Slot**: a semantic state unit inside a component instance (see `state-v0.md`).
- **Projection**: a same-source mapping where external and internal handles share data but differ in capabilities.

---

## 2. Composition Model and Type Convention

### 2.1 Composition model

- expose-state is a composition of **state + expose**.
- The component author calls `def.expose(key, value)` in setup:
  - `value` **must** be an Internal State Handle view.
  - the system exposes an **External State Handle** to the App Maker.

### 2.2 Type system convention (v0)

- `Prototype<P, E>` allows external state types in `E`.
- The external state type should be **low-friction** for App Maker authors to write manually.
- The `def.expose` signature remains unchanged:

```ts
def.expose<K extends keyof E>(key: K, value: E[K]): void
```

> Note: in expose-state, `value` is an internal handle view,
> while `E[K]` describes the external state type.
> The type system should model this projection explicitly (via mapping or declaration merging).

---

## 3. Minimum Shape of External State Handles

External State handles must provide at least:

- `get(): V`
- `subscribe(cb): Unsubscribe`
- `unsubscribe(handle | token): void` or a callable `Unsubscribe` returned by `subscribe`

### 3.1 Normative requirements

1. External State **MUST** be readable (`get`).
2. External State **MUST** be subscribable (`subscribe`).
3. Unsubscribe **MUST** exist (either `unsubscribe` or a returned function).
4. External State **MUST NOT** provide `set` or any equivalent write API.

> Adapters may extend capabilities, but must not weaken the minimum shape.

### 3.2 Required Meta: `StateSpec`

External State handles **MUST** carry read-only semantic meta to help App Maker understand the state.

Normative requirements (v0):

- `spec` **MUST** be present and conform to `StateSpec` (see `packages/types/src/state.ts`).
- `spec` is read-only and does not affect runtime behavior.

Recommended shape (example):

```ts
type ExternalState<V> = {
  get(): V;
  subscribe(cb): Unsubscribe;
  unsubscribe(token): void;
  spec: StateSpec;
};
```

---

## 4. Write Boundary

- expose-state **MUST NOT** allow external writes to the state slot.
- If App Maker needs write capability, it must be exposed explicitly by the component, e.g.
  - `def.expose('setValue', (v) => handle.set(v))`

> The read/write boundary is semantic and must not be bypassed by adapter extensions.

---

## 5. Same-source Consistency (data and subscription)

### 5.1 Data consistency

- The External State handle must be **same-source** with the internal state slot.
- `get()` must return the current internal state value.

### 5.2 Subscription consistency

- When the internal state value changes, External State subscribers **SHOULD** be notified.
- The trigger condition should follow the minimal rule in `state-watch.v0.md`:
  - notify on actual value changes
  - no requirement to notify on semantic equivalence (e.g. `Object.is(prev, next)`)

> This section defines only minimal consistency, not scheduling, ordering, or batching.

### 5.3 Event shape alignment (relative consistency)

If the system has established a `StateEvent<V>` shape (see `packages/types/src/state.ts`),
External State subscriptions should be **relatively consistent** with internal state events:

- **No** `run` handle as the first parameter
- The event object shape matches `StateEvent<V>` (`next/prev/reason`, `disconnect`, etc.)

Recommended form (example):

```ts
subscribe((ev: StateEvent<V>) => void): Unsubscribe
```

---

## 6. Execution Phase and Lifecycle

- `def.expose` remains **setup-only** (see `expose.v0.md`).
- External State usage is bound to the component lifecycle:
  - after dispose, `get` and subscription must fail or return a distinguishable error result
  - during `unmounted` callbacks (before dispose), access may still be treated as valid

---

## 7. Adapter Responsibility Boundary

Adapters must ensure:

- App Maker can retrieve External State handles via the expose channel
- External State handles satisfy the minimum API shape
- subscription callbacks are aligned with Proto UI lifecycle safety

Adapters may extend:

- richer subscription APIs
- read-only derivations or snapshots
- diagnostics or tooling

Adapters must not provide:

- `set` or equivalent write capability
- access paths that bypass lifecycle constraints

---

## 8. Error Model (v0)

Errors must be raised or reported distinctly for:

- `def.expose` called outside setup
- external handle used after dispose
- external handle attempts to write (if such API exists)

### 8.1 Recommended error codes

- `EXPOSE_STATE_PHASE_VIOLATION`
- `EXPOSE_STATE_DISPOSED`
- `EXPOSE_STATE_WRITE_FORBIDDEN`

---

## 9. v0 Contract Tests (minimum coverage)

Implementations must at least cover:

1. setup-only: `def.expose` phase violation throws
2. External State shape: includes `get` + `subscribe` + unsubscribe capability
3. write forbidden: external handle has no set
4. same-source consistency:
   - `get` matches internal current value
   - internal changes trigger subscription callbacks
5. event shape: if `StateEvent` is used, external callbacks omit `run` and otherwise match
6. required meta: `spec` exists and conforms to `StateSpec`
7. dispose rule: `get/subscribe` fail after dispose

---

## 10. Related Contracts (non-normative)

- expose channel core: `internal/contracts/expose/expose.v0.md`
- state core: `internal/contracts/state/state-v0.md`
- state views: `internal/contracts/state/state-handle-views.v0.md`
- state watch: `internal/contracts/state/state-watch.v0.md`
