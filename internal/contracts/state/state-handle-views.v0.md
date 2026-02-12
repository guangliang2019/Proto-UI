# state-handle-views.v0.md

> Status: Draft – v0
>
> This contract specifies the **state handle view system** in Proto UI v0:
> `OwnedStateHandle`, `BorrowedStateHandle`, and `ObservedStateHandle`.
>
> This document does **not** redefine the semantics of state itself.
> It only describes the **differences in capability sets** exposed by the same state slot
> when viewed under different usage contexts.

---

## 0. Positioning and Boundaries

### 0.1 Positioning

State handle views are used to express:

- **Who is using a given state**
- **What level of control that user has over the state**
- **Which operations are allowed or deliberately forbidden**

The purpose of views is not a technical limitation, but a **semantic and stylistic constraint**:
by shaping the API surface, Proto UI makes explicit which usages are encouraged
and which usages are intentionally disallowed.

### 0.2 Boundaries (important)

This document:

- **Only describes the capability sets of each view**
- **Does not describe how views are created or transformed**
- **Does not describe concrete module implementations** (asHook / expose / interaction)

The following topics are **out of scope** for this document:

- How asHook introduces or projects state views
- How expose projects state views to other prototypes or to the App Maker
- Interaction- or system-owned state
- Watch delivery order, scheduling, or re-entrancy semantics
- App-side state projections

---

## 1. Background: Why Views Exist

In Proto UI, the same state slot may be used by different roles, such as:

- The prototype author who defines the state (Component Author)
- A prototype author receiving the state via asHook
- Another prototype consuming the state via expose
- (Further) the App Maker

These users do not share the same **control rights, responsibilities, or expectations**
with respect to the state.

Therefore, Proto UI does not treat a “state handle” as a single uniform shape.
Instead, it defines multiple **views**, each corresponding to a distinct usage semantic.

---

## 2. View Overview (v0)

v0 defines three state handle views:

- **OwnedStateHandle<V>** — owned view
- **BorrowedStateHandle<V>** — borrowed view
- **ObservedStateHandle<V>** — observed view

All three views reference the **same state slot**,
but expose different capability sets.

---

## 3. OwnedStateHandle (owned view)

### 3.1 Semantic positioning

`OwnedStateHandle` represents:

> A state that is defined directly by the current prototype,
> whose full semantics and lifecycle are the responsibility of the current author.

This is the **minimal owning view** of a state,
and the only view returned by `def.state.*` in v0.

### 3.2 Capability set (v0)

`OwnedStateHandle<V>` provides:

- Read:
  - `value` / `get()`
- Write:
  - `setDefault(v)` (setup-only)
  - `set(v, reason?)` (runtime-only)

**Intentionally not provided:**

- `watch(...)`

### 3.3 Design intent (normative)

The absence of `watch` on the owned view is **intentional**, not a technical limitation:

- A state defined by the author is primarily treated as **descriptive state**
- Authors are encouraged to use direct reads and explicit writes
- Self-watching one’s own state as a source of side effects is discouraged

> If reacting to state changes is required, it should be done through other views
> (Borrowed / Observed) or higher-level mechanisms (such as `rule`).

---

## 4. BorrowedStateHandle (borrowed view)

### 4.1 Semantic positioning

`BorrowedStateHandle` represents:

> A state that is not defined by the current prototype,
> but for which the current prototype is granted **partial control**.

It is typically used when:

- The state originates outside the current prototype
- The current prototype is still considered a responsible participant
  in driving the state’s behavior

### 4.2 Capability set (v0)

`BorrowedStateHandle<V>` provides:

- Read:
  - `value` / `get()`
- Write:
  - `set(v, reason?)` (runtime-only)
- Observe:
  - `watch(...)` (setup-only registration)

### 4.3 Design intent (normative)

The borrowed view exposes both `set` and `watch`,
expressing a **shared semantic responsibility**:

- The current prototype may drive state changes
- The current prototype is also expected to react to state changes

This view is commonly used in **composition and reuse scenarios**,
but the exact mechanisms that produce it are not defined in this document.

---

## 5. ObservedStateHandle (observed view)

### 5.1 Semantic positioning

`ObservedStateHandle` represents:

> A state that the current prototype is only allowed to **observe**,
> without any authority to mutate it.

It is used when:

- The state’s semantics and control are entirely external
- The current prototype should only react to the state,
  not influence its value

### 5.2 Capability set (v0)

`ObservedStateHandle<V>` provides:

- Read:
  - `value` / `get()`
- Observe:
  - `watch(...)` (setup-only registration)

**Explicitly not provided:**

- `setDefault`
- `set`

### 5.3 Design intent (normative)

The observed view enforces a **read-only semantic boundary**:

- Prevents multiple prototypes from mutating the same state and causing semantic conflicts
- Clearly separates the **source of state facts** from their **consumers**

---

## 6. Capability Matrix (v0 Summary)

| Capability / View | Owned | Borrowed | Observed |
| ----------------- | ----- | -------- | -------- |
| value / get       | ✓     | ✓        | ✓        |
| setDefault        | ✓     | ✗        | ✗        |
| set               | ✓     | ✓        | ✗        |
| watch             | ✗     | ✓        | ✓        |

> All capabilities are subject to the execution-phase and lifecycle constraints
> defined in `state.v0.md`.

---

## 7. View Immutability Principle

Once a state handle is provided to a user in a given view:

- The capability set of that view **MUST NOT change at runtime**
- The user **MUST NOT escalate** the handle into a higher-privilege view

View selection is a **semantic decision**, not a runtime configuration.

---

## 8. Relationship to the State Core Contract

- All views share the same underlying state slot and value semantics
- Execution-phase rules, lifecycle rules, and the error model are inherited from `state.v0.md`
- This document does not redefine those rules; it only distinguishes capability visibility

---

## 9. Related Contracts (non-normative)

- State core contract: `state.v0.md`
- View projection via asHook: `role/asHook*.v0.md`
- View projection via expose and App-side state: `expose/*.v0.md`
- Interaction / system-owned state: `interaction-signals/*.v0.md`
