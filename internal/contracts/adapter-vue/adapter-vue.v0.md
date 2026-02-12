# Adapter Vue Contract (v0)

This document defines the **obligations and constraints for Vue Adapter Authors**.
It complements the canonical adapter lifecycle contract in
`internal/contracts/lifecycle/adapter-lifecycle.v0.md`.

This document is **normative**.

---

## 1. Framework Injection

- The Vue adapter MUST be created via a factory:
  - `createVueAdapter(runtime)`
- The adapter package MUST NOT statically import `vue`.
- The injected `runtime` MUST provide the minimal Vue runtime surface used by the adapter
  (e.g. `defineComponent`, `h`, refs, lifecycle hooks).

Rationale: allow dynamic loading of Vue runtime and avoid bundling costs in host apps.

---

## 2. Host Root and Commit Boundary

- The adapter MUST render into a single host root element created by the adapter.
- The host root element is the **adapter instance token** and **event root**.
- CP4 (Commit Done) MUST occur after Vue commit is complete.
  - Event gating MUST be enabled **after** commit.

---

## 3. Slots

- `slot()` MUST map to Vue `slots.default()`.
- Named slots are not supported in v0.
- Multiple slot nodes are illegal in v0 and MUST throw.

---

## 4. Feedback Style

- `feedback.style` tokens MUST be applied to the host root’s class list.
- Adapter MUST NOT remove user-provided classes.

---

## 5. Events

- Adapter MUST provide `EVENT_ROOT_TARGET_CAP` and `EVENT_GLOBAL_TARGET_CAP`.
- Event dispatch MUST be gated and become effective only after CP4.
- On CP8, event dispatch MUST become ineffective immediately.

---

## 6. Lifecycle

- The adapter MUST follow the canonical lifecycle contract.
- `unmounted` MUST run before disposal (CP9 before CP10).

