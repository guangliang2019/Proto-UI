# state-watch.v0.md

> Status: Draft – v0
>
> This contract specifies the **watch capability of state** in Proto UI v0,
> including its positioning, applicable handle views, registration timing,
> and lifecycle constraints.
>
> This document deliberately defines only a minimal semantic surface for `watch`
> and does **not** treat it as a reactive system or a render-driving mechanism.

---

## 0. Positioning Statement

In Proto UI, `watch` is an **auxiliary observation capability**
that allows consumers to be notified when a state value changes.

The design goals of `watch` are:

- To support a small amount of explicit state-coupling logic
- To enable controlled integration of side effects and module composition
- **Not** to build an automatic update, dependency-tracking,
  or reactive rendering system

Accordingly, v0 keeps the semantic commitments of `watch` intentionally minimal.

---

## 1. Applicable Handle Views

In v0, `watch` is **not** a capability available on all state handle views.

### 1.1 Views that allow `watch`

`watch` is only available on:

- `BorrowedStateHandle`
- `ObservedStateHandle`

### 1.2 Views that do not allow `watch`

- `OwnedStateHandle` **does not** provide `watch`

> This restriction is a **semantic and stylistic constraint**, not a technical one.
> Authors are discouraged from treating self-defined state as a source of side effects.

---

## 2. Watch Registration Rules

### 2.1 Registration timing (v0)

- `watch(...)` **MUST** be called during the setup phase
- Calling `watch` during runtime **MUST** throw

This constraint ensures that:

- Watch relationships are fully established early in the instance lifecycle
- Dynamic addition or removal of watchers at runtime is avoided

### 2.2 Registration form

The exact registration form of `watch` is not strictly specified in v0,
but it MUST satisfy the following:

- A callback function `cb` is registered
- When the state value changes, the system invokes the callback
  at an appropriate time

The callback signature and event object shape are **not** defined by this contract.

---

## 3. Trigger Conditions (minimal constraints)

v0 specifies only the following minimal trigger conditions:

- When the state value **actually changes**, `watch` **SHOULD** be triggered
- When the next value is semantically equivalent to the previous value
  (e.g. `Object.is(prev, next)`), `watch` **MAY NOT** be triggered

Beyond this, this contract does **not** specify:

- Whether delivery is synchronous or asynchronous
- The ordering among multiple watchers
- Any batching or coalescing behavior

---

## 4. Lifecycle and Cleanup

### 4.1 Automatic cleanup

Watches registered via a state handle:

- **MUST** be bound to the component instance lifecycle
- **MUST** be automatically cleaned up on `unmounted` / dispose
- Consumers neither need nor are allowed to manually unregister them

### 4.2 Behavior after dispose

After the instance is disposed:

- Watch callbacks **MUST NOT** be invoked
- Calling `watch` on an invalid (disposed) handle **MUST** throw
  (see execution-phase rules)

---

## 5. Re-entrancy and Side Effects (v0 minimal stance)

v0 takes an open but conservative stance on behavior inside watch callbacks:

- A watch callback **MAY** read state
- A watch callback **MAY** trigger updates to other states
- Implementations **MAY** apply simple re-entrancy protection
  or event-queue mechanisms

This contract does **not** guarantee or forbid:

- Calling `set` on the same state from within its own watch callback
- Any upper bound on nesting depth or execution count

> For stronger determinism or structured reactions,
> higher-level mechanisms (such as `rule`) should be preferred.

---

## 6. Relationship to Rendering and Updates

`watch` has **no direct coupling** with rendering or update scheduling:

- A watch callback **MUST NOT** implicitly trigger render or commit
- If UI updates are required, `run.update()` (or an equivalent update entry)
  must be called explicitly

`watch` itself is not part of a rendering or scheduling model.

---

## 7. Error Model (v0)

The following conditions **MUST** throw:

- Calling `watch` outside the setup phase
- Calling `watch` on an invalid (disposed) handle

Error diagnostics SHOULD include, when possible:

- The state semantic
- The operation label (e.g. `state(<semantic>).watch`)
- The actual and expected execution phases (if available)

---

## 8. Relationship to Other Contracts

- Execution-phase and lifecycle rules are inherited from `state.v0.md`
- Visibility rules for `watch` are inherited from `state-handle-views.v0.md`
- This document does not define how `watch` is used by rule,
  interaction, or expose mechanisms

---

## 9. v0 Summary

In v0:

- `watch` is an **optional, auxiliary capability**
- It supports limited state coupling rather than reactive systems
- Proto UI does not encourage building complex state-driven logic around `watch`

Higher-level state reaction and composition should preferentially use
`rule` or other declarative mechanisms.
