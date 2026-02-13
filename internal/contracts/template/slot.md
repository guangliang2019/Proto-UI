# Template Slot (Protocol Constraint)

This contract defines Proto UI's **slot** semantics at the protocol level.

> Important: the constraints in this document are **intentional protocol design**. They are not a temporary "v0 compromise".
>
> Rationale: Proto UI is a cut-line protocol between:
>
> - Prototype ecosystem (interaction authoring)
> - Adapter/Compiler ecosystem (host mapping)
>
> We prioritize strict, stable, cross-host semantics over authoring convenience. More expressive slot APIs (named slots, multi slots, props, fallback, etc.)—if desired—belong to **Frameworks built on top of Proto UI**, not core/runtime/contracts.

---

## Scope

This contract covers:

- Template reserved node: `slot`
- Authoring API: `r.slot()`
- Structural constraints that every adapter/compiler can rely on

Non-goals:

- DOM `<slot>` behavior (that is host-specific, e.g. Shadow DOM)
- Projection algorithms (adapter-level, e.g. MutationObserver for Light DOM)

---

## Slot Node (Template-level)

A slot is expressed as a reserved template node:

- `type = { kind: "slot" }`

It is a marker for "children from host / external composition" at the template layer.

---

## Protocol Constraints (MUST)

### S1: Slot is anonymous (no name)

- Slot MUST NOT be named.
- `r.slot()` takes **no arguments**.

Reason: named slots introduce host-specific mapping complexity and uneven semantics across platforms.

### S2: At most one slot per template

- A single render output MUST contain **0 or 1** slot nodes.
- Multiple slot nodes MUST throw (either at template construction or commit-time; core-level enforcement is preferred).

Reason: multi-slot requires a projection model with ordering, routing, and conflict rules that many hosts do not share.

### S3: Slot carries no props/params

- Slot MUST NOT accept params.
- No slot props contract is defined at core/runtime level.

Reason: paramized slot implies a component-model contract, which is intentionally out of scope for Proto UI core.

---

## What adapters can assume

Adapters/compilers may assume:

- Slot is either absent or appears once.
- Slot is anonymous and has no parameters.
- If a host supports native slotting (e.g. Shadow DOM), the adapter can map to it.
- If a host does not, the adapter can implement projection using host mechanisms (e.g. Light DOM + MO).

Frameworks built on Proto UI may provide richer slot authoring UX, but MUST compile down to this constraint set.
