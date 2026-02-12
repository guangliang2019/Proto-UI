# rule.when.deps.context.wiring (v0)

## Purpose

Defines how context dependencies are validated at evaluation time.
There is no required stable update cycle in v0.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

- Evaluation-time validation for context
- Protective behavior against invalid context
- Interaction with state-driven re-evaluation

### 0.2 Non-goals (v0)

- Does not define provider resolution
- Does not define context structure
- Does not define intent behavior

---

## 1. Context dependency characteristics

In v0:

- context is resolved via providers
- values are readonly
- no change notifications
- provider connect/disconnect is not surfaced

Therefore, context dependencies are **potentially unstable inputs**.

---

## 2. Evaluation-time validation (v0)

### 2.1 No implicit polling

v0 does not require a stable runtime update cycle.
Runtime MUST NOT rely on periodic re-evaluation.

### 2.2 Resolve on evaluation

When a rule is evaluated for any reason:

- resolve the context value at that moment
- missing providers or invalid paths resolve to `null`
- evaluation MUST continue without throwing

This prevents execution of stale logic when context is absent/invalid.

---

## 3. Interaction with state dependencies

If a rule depends on both state and context:

- state changes MUST still trigger re-evaluation (see `when.deps.state.wiring.v0.md`)
- context dependency does not replace state triggers

---

## 4. Phase & scheduling constraints

- context-driven evaluation MUST occur during runtime phases
- setup phases MUST NOT evaluate rules

Runtime MAY:

- batch multiple re-evaluations
- align evaluation with host/runtime loops (if any)

---

## 5. Diagnostics (recommended)

Implementations SHOULD provide diagnostics indicating:

- rule is context-dependent
- evaluation-time validation is in effect

Diagnostics MUST NOT alter semantics.

---

## 6. Non-goals

This contract does NOT:

- require provider relocation detection
- require equality comparison of context values
- allow rules to mutate context
- define context caching strategies

---

## 7. Summary

- v0 does not rely on update cycles
- context is validated only at evaluation time
- state triggers remain authoritative

