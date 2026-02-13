# rule.when.deps.state (v0)

## Purpose

Defines which state handle views may be observed by `when`, and what that implies.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

- Allowed state handle views for `when`
- Guarantees when a state is referenced
- Boundaries between observation and mutation

### 0.2 Non-goals (v0)

- Does not define re-evaluation triggers (see wiring contract)
- Does not define state creation/expose (see state contracts)
- Does not define intent behavior

---

## 1. Terms

- **State**: created via `def.state.*`, internally identified by `StateId`
- **State Handle View**:
  - Owned: read/write
  - Borrowed: read/write with limited capability
  - Observed: read-only
- **Rule dependency**: a state handle reference used by `when`

---

## 2. Allowed Dependencies

`when` may depend on any handle view available in definition scope:

- Owned
- Borrowed
- Observed

---

## 3. Guarantees

When a rule depends on a state handle view:

- The runtime MUST treat it as a reactive dependency
- Its changes MUST be able to trigger re-evaluation (see wiring)
- The rule MUST read via `get()`, not callbacks

---

## 4. Limits (v0)

### 4.1 Observation is not write permission

Observing a handle view does not imply intent can write it. Writability is defined by the **state** contract.

### 4.2 No imperative logic

State dependencies do not permit imperative logic:

- Rule must remain serializable and analyzable
- History-dependent behavior must be expressed via explicit state machines or callbacks

---

## 5. Diagnostics (recommended)

When observing `Observed` view, implementations SHOULD provide diagnostics:

- state semantic name (if any)
- view type (Owned/Borrowed/Observed)
- origin prototype or asHook source

---

## 6. Non-goals

This contract does NOT:

- Grant extra APIs to Observed views
- Weaken the readonly constraint of Observed
- Define evaluation frequency or scheduling

---

## 7. Summary

- `when` can observe Owned/Borrowed/Observed
- Observation does not imply write permission
- Rule remains declarative and analyzable
