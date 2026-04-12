# Interaction Boundary / Hit Participation Architecture Note

**Goal:** turn the April 12 interaction-ability discussion into an implementation-facing architectural note that can guide module, adapter, and prototype work.

**Core decision:** Proto UI must stop treating "outside click" as a one-off component trick. Instead, it should formalize:

- `hit participation`
- `interaction boundary`
- higher-level consumers such as `overlay`, `dismiss`, `modal`, and `focus`

---

## 1. Ordering

The intended conceptual order is:

```text
Hit Participation -> Boundary -> Event -> Overlay / Dismiss / Focus
```

This ordering matters because the systems answer different questions:

- hit participation: can this region become part of the hit path?
- boundary: if an interaction was sampled, which interaction domain owns it?
- event: what callback should run?
- consumer policy: should the component dismiss, trap focus, block, or restore?

---

## 2. Why current outside-click logic is not enough

Current repository state already shows the pressure:

- `asOverlay(...)` exists as a privileged hook and central overlay capability
- dialog content still contains hand-written global `pointerdown` outside-close logic
- dropdown/select do not yet have one shared outside model
- adapter routing already has to account for portals and moved hosts

This means a raw DOM `contains(...)` mental model is not stable enough for Proto UI.

It breaks down when:

- trigger and content are separate regions
- content is portaled or relocated
- adapters maintain logical parent links
- the host cannot safely classify an interaction

---

## 3. Boundary should be foundational, not incidental

`interaction boundary` should become the single place that answers:

- is this interaction inside my interaction domain?
- is it outside?
- or is the host unable to tell?

Consumers such as overlay should then subscribe to those answers instead of re-implementing them.

That gives Proto UI:

- one semantic source of truth
- a place to preserve `unknown`
- a cleaner path to weak stacking
- less component-specific duplication

---

## 4. Hit participation must remain separate

It is tempting to treat passthrough or hit suppression as part of boundary, but that would blur two distinct questions.

Example:

- a decorative wrapper might not participate in hit-testing at all
- the eventual hit still belongs to some boundary, but only after passthrough resolves

So:

- hit participation decides whether something joins the hit path
- boundary decides which domain owns the resulting interaction

This separation is important for modal masks, transparent layers, and other overlay-adjacent structures.

---

## 5. Overlay should become a consumer

Today, `overlay` already centralizes open/close state, registration, placement, and host capabilities. That is a strong base.

But long-term, overlay should not be the owner of low-level interaction truth.

Instead:

- overlay registers structural roles into boundary
- overlay consumes boundary-derived outside/focus-outside results
- `modal` becomes a policy declaration rather than an implicit claim of low-level interception power

This keeps overlay focused on overlay governance while letting foundational interaction capability live below it.

---

## 6. Why dropdown/select should migrate before dialog

Dialog combines too many concerns at once:

- outside press
- alert behavior
- focus trap
- portal
- modal-like policy
- mask presence

Dropdown and select are narrower probes for the first boundary rollout:

- they already depend on overlay
- they need outside-close semantics
- they exercise trigger/content separation
- they are easier to validate before modal policy enters the picture

So the recommended migration order is:

1. formalize contracts
2. build boundary MVP
3. migrate dropdown/select
4. add hit participation MVP
5. move overlay to consume boundary
6. rewrite dialog/modal implementation

---

## 7. Adapter obligations

Adapters are free to implement boundary and hit participation differently, but they must preserve the contract.

In practice, that means:

- portals and moved hosts must still be classifiable when possible
- logical-parent metadata may be used
- `unknown` must be returned when the host cannot safely prove inside or outside

The most important discipline is correctness over convenience:

- never fabricate `outside`
- never hide host limitations behind false certainty

---

## 8. Immediate execution guidance

The safest first step is not to build everything at once. It is to:

1. lock the contracts
2. strengthen regression tests for current behavior
3. build `module-boundary` as a minimal, standalone capability

That creates a stable base for later implementation without forcing dialog, overlay, and modal policy to be rewritten in one jump.
