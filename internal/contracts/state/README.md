# State Contract Index

This directory defines **state** contracts for Proto UI.

State is a first-class, typed state machine channel used by:

- component internal logic (runtime set / watch depending on visibility)
- rule (as a declarative input source)
- expose (as a public, readonly observable state)

State contracts define:

- type system / spec definitions
- handle capabilities by visibility (private/protected/public)
- event model for watch/subscribe
- phase rules (setup-only vs runtime-only)
- error model

---

## Contract Set (v0)

- `state-v0.md`

  - v0 normative contract for author-defined states (`def.state.*`) and their handles.

- `interaction-derived.v0.md`

  - v0 normative contract for **derived readonly interaction states**.
  - These are _state-shaped_ values driven by adapter/event streams (e.g. `pressed`, `focused`).
  - They are readonly (no `set`) and exist to support rule + component logic without imperative bookkeeping.

- `state.v0.impl-notes.md`

  - Non-normative implementation notes for v0 state.

- `interaction-derived.v0.impl-notes.md`

  - Non-normative implementation notes for derived interaction states.

---

## Related Contracts

- `event` (drives interaction-derived states)
- `runtime/lifecycle-with-host.v0.md` (unmount cleanup/reset)
- `rule` (consumes states as inputs)
- `expose` (publishes public readonly state handles)
