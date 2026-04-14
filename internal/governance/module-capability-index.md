# Proto UI Module Capability Index

> Internal governance reference. This document is a practical index for `Adapter Author` work. It summarizes what each module package provides, whether it is required or optional, what host caps it expects, what it depends on, and what happens if an adapter does not support it.

---

## 1. Purpose

Proto UI modules are capability units consumed mainly by adapters.

This document exists to help adapter authors answer:

- what capability a module provides
- whether the module is required, recommended, or optional
- which host caps the adapter must provide
- which other modules it depends on
- what functionality is lost if the module is not supported

This is primarily an adapter-design reference.

It is not a full architecture document.

---

## 2. How To Read This Document

Use the following status meanings:

- `Required`: an adapter should normally support this for Proto UI to remain meaningfully usable
- `Strongly recommended`: not universally mandatory, but usually important for host fidelity or web-facing ergonomics
- `Optional`: may be omitted if the host cannot express the capability faithfully
- `Structural`: a base or infrastructure module rather than a direct user-facing capability

Module support should be judged by host truthfulness, not by raw quantity.

It is better for an adapter to refuse a module honestly than to pretend to support it badly.

---

## 3. Typical Integration Pattern

In normal adapter work, a module is not integrated by touching its internals directly.

The usual path is:

1. build the adapter on top of `@proto.ui/adapter-base`
2. decide which modules the adapter intends to support
3. use adapter-base helpers or equivalent `wiring.attach(moduleName, entries)` logic
4. provide the host caps required by that module

The practical rule is:

- the adapter chooses the module
- the adapter provides the host caps
- the module consumes those caps through runtime wiring

So this document should be read as both:

- a capability index
- a host-cap checklist for adapter authors

---

## 4. Structural Module

| Package | Status | Purpose | Host-cap | Depends on | If omitted | Wiring note |
| --- | --- | --- | --- | --- | --- | --- |
| `@proto.ui/module-base` | Structural | Shared root and structural contract for all module packages | None direct | None | Other modules cannot be formed in the expected Proto UI module shape | Structural base only; not usually wired as a standalone capability module |

---

## 5. Capability Index

| Package | Status | Capability | Host-cap | Depends on | If omitted | Wiring note |
| --- | --- | --- | --- | --- | --- | --- |
| `@proto.ui/module-anatomy` | Required | Provides anatomy capabilities so a prototype can query related parts and subscribe to exposed state or methods in a larger family structure | `ANATOMY_INSTANCE_TOKEN_CAP`, `ANATOMY_PARENT_CAP`, `ANATOMY_GET_PROTO_CAP`, `ANATOMY_ROOT_TARGET_CAP`, optional `ANATOMY_ORDER_OBSERVER_CAP` | None | Prototypes lose cross-part anatomy awareness and family-level coordination | Usually wire via adapter-base `useAnatomy(...)` |
| `@proto.ui/module-as-trigger` | Required | Supports the privileged `asTrigger` capability and merged trigger event routing across nested trigger structures | `AS_TRIGGER_INSTANCE_CAP`, `AS_TRIGGER_PARENT_CAP`, `AS_TRIGGER_GET_PROTO_CAP` | `@proto.ui/module-event` | Nested trigger composition and unified trigger routing will not work correctly | Usually wire via adapter-base `useAsTrigger(...)` and ensure event is also present |
| `@proto.ui/module-boundary` | Required | Provides interaction-boundary logic such as click-outside and focus-outside | `BOUNDARY_HOST_BRIDGE_CAP`, often `HOST_ELEMENT_CAP` for current-host region behavior | None | Cross-platform boundary judgments become unavailable or unreliable | Usually wire via adapter-base `useBoundary(...)` |
| `@proto.ui/module-context` | Required | Provides context as a prototype-to-prototype information channel | `CONTEXT_INSTANCE_TOKEN_CAP`, `CONTEXT_PARENT_CAP` | None | Prototypes cannot communicate through the Proto UI context path | Usually wire via adapter-base `useContext(...)` |
| `@proto.ui/module-event` | Required | Provides event as the user-interaction information channel | `EVENT_ROOT_TARGET_CAP`, `EVENT_GLOBAL_TARGET_CAP`, optional `EVENT_EMIT_CAP` | None | Prototypes cannot react through the standard Proto UI event path | Usually wire via adapter-base `useEventTargets(...)` |
| `@proto.ui/module-expose` | Required | Lets prototypes expose behaviors and states outward as subscribable signals | `EXPOSE_SET_EXPOSES_CAP` | None | Adapters cannot translate outward exposure semantics cleanly to host-facing APIs | Usually wired together with outward host sink logic |
| `@proto.ui/module-expose-state` | Required | Normalizes DX and host collaboration when a prototype exposes state outward | No dedicated module-local cap file; current adapter-base bridges this path through an expose-style host sink | `@proto.ui/module-expose`, `@proto.ui/module-state` | Exposed state loses the unified subscription and host-collaboration model | Treat as an expose/state bridge; verify host sink design when extending |
| `@proto.ui/module-expose-state-web` | Strongly recommended | Mirrors exposed state changes to DOM attributes and CSS variables in web hosts | `HOST_ELEMENT_CAP`, `EXPOSE_STATE_WEB_MAP_CAP`, optional `EXPOSE_STATE_WEB_MODE_CAP` | `@proto.ui/module-expose-state` | Web output loses convenient DOM or CSS reflection of exposed state | Usually wire via adapter-base `useExposeStateWeb(...)` |
| `@proto.ui/module-feedback` | Required | Provides feedback as the user-perceivable channel, especially visual feedback | `EFFECTS_CAP` | None | Prototypes lose the standard path for perceivable feedback | Usually wire via adapter-base `useFeedback(...)` |
| `@proto.ui/module-focus` | Required | Supports privileged focus hooks such as `asFocusable`, `asFocusScope`, and `asFocusGroup` | `FOCUS_INSTANCE_TOKEN_CAP`, `FOCUS_PARENT_CAP`, `FOCUS_ROOT_TARGET_CAP`, `FOCUS_IS_NATIVELY_FOCUSABLE_CAP`, `FOCUS_SET_FOCUSABLE_CAP`, `FOCUS_REQUEST_FOCUS_CAP`, `FOCUS_BLUR_CAP` | None | Focus-system features cannot be expressed properly | Usually wire via adapter-base `useFocus(...)` |
| `@proto.ui/module-hit-participation` | Required | Provides reliable hit-testing semantics and host-aligned click participation interpretation | `HIT_PARTICIPATION_HOST_BRIDGE_CAP`, often `HOST_ELEMENT_CAP` | None | Interaction judgments that depend on hit testing become less reliable | Usually wire via adapter-base `useHitParticipation(...)` |
| `@proto.ui/module-overlay` | Required | Supports privileged `asOverlay` behavior and host-aligned overlay rendering | optional `HOST_ELEMENT_CAP`, `OVERLAY_GLOBAL_MOUNT_CAP`, `OVERLAY_MODAL_CAP`, `OVERLAY_LAYER_SCHEDULER_CAP` | None | Overlay-style prototypes cannot render or coordinate overlays in the intended way | Usually wire via adapter-base `useOverlay(...)` |
| `@proto.ui/module-presence` | Optional | Supports soft unmount behavior for `asTransition` and delays dismount until animation completion | `PRESENCE_HOST_BRIDGE_CAP` | None | Transition-driven enter or exit animation timing will not work, but other interaction may still function | Usually wire via adapter-base `usePresence(...)` |
| `@proto.ui/module-props` | Required | Provides the props information channel so makers can configure prototypes | `RAW_PROPS_SOURCE_CAP` | None | Prototypes cannot accept standard Proto UI configuration input | Usually wire via adapter-base `useProps(...)` |
| `@proto.ui/module-rule` | Required | Provides rule syntax for semantically describing prototype logic and style or state reactions | None direct | None | Rule-authored prototype logic cannot run through the intended rule path | More dependent on props, state, context, and feedback collaboration than on dedicated host caps |
| `@proto.ui/module-rule-expose-state-web` | Strongly recommended | Compiles certain dynamic style rules into static CSS for web hosts | `RULE_EXPOSE_STATE_WEB_NATIVE_VARIANT_POLICY_CAP` | `@proto.ui/module-rule`, `@proto.ui/module-expose-state-web` | Web adapters lose this optimization and may rely on heavier runtime styling paths | Usually wire via adapter-base `useRuleExposeStateWeb(...)` |
| `@proto.ui/module-rule-meta` | Optional | Extends rule `when` expressions with system-level metadata such as theme preference | `RULE_META_GET_CAP` | None | Rule expressions cannot depend on these additional system-level signals | Usually wire via adapter-base `useRuleMeta(...)` |
| `@proto.ui/module-state` | Required | Provides the unified Proto UI state model | None direct | None | Prototypes lose the standard state authoring and state-machine-like behavior model | Pure capability layer in the current design; no module-specific host cap |
| `@proto.ui/module-state-accessibility` | Required | Adds accessibility-derived state APIs such as `fromAccessibility` | None direct | `@proto.ui/module-state` | State cannot express the standard accessibility-derived sub-API | Depends on state semantics more than host wiring in the current design |
| `@proto.ui/module-state-interaction` | Required | Adds interaction-derived state APIs such as hover- and focus-related state projections | None direct | `@proto.ui/module-state`, `@proto.ui/module-event` | State cannot express official interaction-derived state signals | Depends on event and state flow rather than dedicated host caps |
| `@proto.ui/module-test-sys` | Required | Integrates automated self-checking into the core-to-runtime-to-adapter lifecycle | optional `HOST_PROBE_CAP` | None | Adapter integration loses the official module-based self-check path | Basic self-check works without host probe; probe helps verify host-cap wiring |

---

## 6. Adapter Design Guidance

When designing an adapter, use the module list in this order:

1. confirm the required modules first
2. decide which strongly recommended modules the host can support faithfully
3. justify every optional module explicitly
4. avoid claiming support for a module whose host semantics are weak or misleading

The central question is not:

"How many modules does this adapter support?"

It is:

"Which capability contract can this host support truthfully?"

---

## 7. Notes

- Module status in this document is about adapter capability design, not about launch-package governance.
- Some modules are web-specific recommendations because the host can express special behavior such as DOM reflection or CSS compilation.
- A module may be important even if it is not part of a first-user story. This document is about adapter construction quality.
