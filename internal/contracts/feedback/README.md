# Feedback Contracts (v0)

## 1. Purpose

The feedback module records **user-facing style intent**.

Feedback does **not** decide how styles are realized on a specific host.
It does **not** choose between CSS, classes, attributes, or variables.
It does **not** schedule rendering or updates.

Its sole responsibility is to **capture, merge, and export style intent**
in a stable, host-agnostic form that can be consumed by adapters and other
internal modules.

In Proto-UI, feedback is intentionally limited.
Its value emerges from composition with other modules, not from standalone expressiveness.

---

## 2. Scope (v0)

### Included in v0

- `feedback.style`
- Static style intent recording
- Semantic-aware merging of style handles
- Export of merged style intent for adapters and internal consumers

### Explicitly excluded in v0

- Dynamic conditions (`when` expressions)
- Selectors or pseudo-class syntax
- Rendering strategy decisions
- Scheduling policy or timing guarantees
- Direct DOM manipulation
- Host-specific style syntax

If a feature requires knowledge of **how** or **when** styles are applied,
it is outside the scope of feedback and belongs to adapters or higher-level orchestration modules.

---

## 3. Separation of Concerns

Feedback participates in a larger composition:

- **State**  
  Owns values, but does not define how they are observed.

- **Expose**  
  Defines how state becomes observable to the host (e.g. attributes, CSS variables).
  Expose is the sole source of host-level observability.

- **Rule**  
  Binds conditions (`when`) to intents.
  Rule decides _when_ an intent is active.

- **Feedback**  
  Records style intent without assuming realization strategy.
  Feedback is unaware of conditions, exposure, or scheduling.

- **Adapter**  
  Chooses realization strategy based on host capability and exposure.
  Adapter may compile intents to CSS, or apply them via imperative updates.

Whether a style intent can be compiled into CSS is a **consequence of exposure**,
not a property of feedback itself.

---

## 4. Design Invariants

All feedback implementations and adapters consuming feedback must respect
the following invariants.

### Invariant 1 — Semantic Stability

Given the same sequence of style intents, feedback must produce the same
merged result.

Merging must be deterministic and independent of host behavior.

---

### Invariant 2 — Order Preservation

Feedback must not reorder style intents in a way that reverses the relative
order of user interactions.

Later intents may override earlier ones according to semantic rules,
but intent order must never be inverted due to scheduling or batching.

---

### Invariant 3 — Host Agnosticism

Feedback must not encode host-specific syntax, selectors, or realization details.

Any syntax that directly encodes a realization strategy (e.g. selector-based
variants or pseudo-classes) is considered out of scope for feedback.

---

## 5. Intent vs. Implementation

Feedback records **what** visual intent exists, not **how** it is implemented.

Examples:

- “This component should appear disabled” is an intent.
- “Use `[data-disabled] { opacity: 0.5 }`” is an implementation.

Implementation details may be derived later by adapters,
based on exposure and host capabilities.

Allowing implementation syntax inside feedback would tightly couple
component authors to adapter internals and destabilize the system.
Such coupling is explicitly rejected by this contract.

---

## 6. Why Feedback Is Intentionally Limited

Feedback alone is not expressive.

This is intentional.

Feedback does not:

- React to conditions
- Track state
- Perform updates
- Optimize rendering

Instead, it serves as a **stable semantic anchor** that other modules
(rule, expose, adapter) can rely on.

Expressiveness in Proto-UI emerges from **composition**, not from individual modules.

---

## 7. Related Contracts

This document defines the conceptual foundation for the following contracts:

- `feedback/style.use.setup-only.v0`
- `feedback/style.merge.semantic.v0`
- `feedback/style.export.v0`
- `adapter-web-component/feedback.style.apply-to-host.v0`

Each contract refines a specific boundary described here.
