# rule.when.deps.state.wiring (v0)

## Purpose

Defines how `when` evaluation is wired to state changes.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

- Dependency declaration model
- Re-evaluation triggers
- Phase constraints
- Error handling

### 0.2 Non-goals (v0)

- Does not define which states may be referenced (see `when.deps.state.v0.md`)
- Does not define intent behavior
- Does not mandate a scheduling strategy

---

## 1. Dependency Model

### 1.1 Declaration

Rule dependencies are declared via RuleIR.
If RuleIR references a state:

- that state MUST be treated as a reactive dependency
- dependency is on the **value**, not callbacks

### 1.2 Value Access

During evaluation:

- runtime MUST read current value via `state.get()`
- no implicit caching across evaluations unless explicitly documented

---

## 2. Re-evaluation Triggers

### 2.1 State change trigger

If any referenced state transitions from `prev` to `next`:

- runtime MUST schedule re-evaluation
- independent of handle view (Owned/Borrowed/Observed)

A state transition is `prev !== next` per the state's equality rules.

### 2.2 No coalescing requirement

- runtime MUST NOT assume multiple state changes can be coalesced safely
- batching is allowed, but semantics must not depend on batching

---

## 3. Phase Constraints

- Re-evaluation occurs during runtime phases
- Setup-only phases MUST NOT evaluate rules
- runtime MUST ensure phase correctness before evaluation

If the host has an update cycle:

- re-evaluation MAY align to it
- semantics must be equivalent to “evaluate after every relevant state change”

---

## 4. View Independence

Handle view does not affect reactivity:

- Owned changes MUST trigger re-evaluation
- Borrowed changes MUST trigger re-evaluation
- Observed changes MUST trigger re-evaluation

Observed readonly constraint MUST NOT weaken reactivity.

---

## 5. Error Handling

Runtime MUST report errors when:

- evaluation accesses a disposed/invalid state
- phase violations occur

Recommended error context:

- rule identity
- state identity
- current runtime phase

---

## 6. Non-goals

This contract does NOT:

- define rule ordering or conflict resolution
- require synchronous evaluation

---

## 7. Summary

- Rules are state-driven
- Any referenced state change MUST trigger re-evaluation
- View type does not weaken reactivity

