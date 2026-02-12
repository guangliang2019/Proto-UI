# Contract: adapter-web-component / Light DOM slot (v0)

## Scope

This contract defines **Light DOM** slot projection semantics for `@proto-ui/adapters.web-component` v0.

- Applies when `defineWebComponent(proto, { shadow: false })` (default)
- Applies when template contains **exactly one** `r.r.slot()` (unnamed)
- Shadow DOM semantics are **out of scope** (native `<slot>` handles projection)

## Terminology (working)

- **Host element**: the custom element instance (e.g. `<x-foo>`)
- **Template slot marker**: the template node produced by `r.r.slot()`
- **Projected nodes**: nodes that originate from outside the template, typically appended as direct children of the host element

## Guarantees

### G1. Initial projection (before connected)

If the host element has direct children **before** it is connected, then on first commit:

- Those nodes are projected into the slot position
- The slot marker **MUST NOT** render as a real `<slot>` element in Light DOM

### G2. Relative order around slot

Template siblings around the slot (prefix/suffix) must keep their order.
Projected nodes appear exactly at the slot position between prefix and suffix.

### G3. Text nodes are supported

Projected pool includes non-element nodes (e.g. `Text`).

### G4. update() does not duplicate or drop projected nodes

Calling `el.update()` (adapter-exposed) must preserve already projected nodes:

- No duplication
- No dropping (not becoming empty)

### G5. Runtime projection via MutationObserver (MO)

After connected, if user appends a node as a **direct child** of the host element:

- The adapter must move it into the slot position.
- This projection may be asynchronous (macro task), and tests should not assume microtask timing.

> Implementation note: Macro task scheduling (e.g. `setTimeout(0)`) is acceptable and expected for MO-driven projection in v0.

## Non-goals / Explicitly unsupported in v0

- Multiple slots
- Named slots
- Passing arguments to `slot()`
- Slotting based on descendants (only direct children of host are observed as “new inputs”)

## Failure mode expectations

Unsupported features should fail loudly (throw), but tests should avoid freezing exact error messages.
