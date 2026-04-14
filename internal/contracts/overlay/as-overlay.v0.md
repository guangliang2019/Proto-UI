# as-overlay.v0.md

> Status: Draft - v0
>
> This document defines the Proto UI v0 `asOverlay(...)` contract.

---

## 0. Positioning

`asOverlay(...)` declares that the current prototype instance participates in overlay governance.

It is responsible for:

- overlay open/close/toggle lifecycle
- overlay content registration
- optional trigger/anchor registration as structural roles
- dismiss policy
- focus entry and restore coordination
- overlay stack and nesting participation
- host-mediated placement negotiation

It is not responsible for:

- defining trigger interaction semantics such as click, hover, or contextmenu
- defining item selection semantics
- defining modal/backdrop/scroll-lock policy in general
- inventing a host-specific portal mechanism

### 0.1 Transitional Semantics Note

Current repository implementations may still expose options such as `modal`, `closeOnOutsidePress`, and `closeOnFocusOutside` through `asOverlay(...)`.

Normative direction:

- `modal` should be treated as a **policy declaration**
- outside/focus-outside semantics should ultimately derive from a dedicated interaction-boundary capability
- overlay should remain a consumer of those semantics rather than the foundational owner of them

This means:

- the presence of a `modal` option does **not** imply that overlay is the permanent home of low-level interaction interception semantics
- temporary implementation details in adapters or prototypes do not redefine the long-term layering model

---

## 1. Why It Exists

Overlay behavior crosses multiple subsystems:

- event: escape, outside press, focus outside
- focus: entry, restore, local boundary behavior
- state: open/closed facts
- host/layout: anchor-relative placement and visibility

These concerns should not be re-authored independently inside every dropdown, popover, tooltip, or context menu protocol.

---

## 2. Scope of v0

`asOverlay(...)` in v0 targets **anchored non-modal overlays** first.

Examples:

- dropdown menu content
- popover content
- context menu content
- select/listbox popup content
- combobox popup content
- tooltip / hover-card content

v0 does not require modal dialog features such as:

- backdrop semantics
- inert outside tree
- scroll locking
- universal top-layer behavior

These may be defined later by a separate modal overlay contract or an explicit extension of this one.

---

## 3. Invocation Model

`asOverlay(...)` is a privileged, configurable, singleton-install asHook.

- the first call installs overlay capability for the current instance
- later calls reuse the same underlying handle
- later setup calls may contribute configuration patches
- repeated calls must not reinstall the capability

The primary authoring entry is expected to be content/root-oriented hooks such as:

- `asDropdownContent(...)`
- `asTooltipContent(...)`
- `asPopoverContent(...)`

Direct use of `asOverlay(...)` by authors should be possible, but is not the primary expected path.

---

## 4. Trigger Relationship

`asOverlay(...)` does **not** own trigger interaction semantics.

The following are outside the responsibility of `asOverlay(...)`:

- open on click
- open on hover
- open on focus
- open on `context.menu`

Those behaviors should be defined by component-specific trigger hooks such as:

- `asDropdownTrigger(...)`
- `asTooltipTrigger(...)`
- `asDialogTrigger(...)`

However, `asOverlay(...)` may still recognize **trigger** as a structural role for purposes such as:

- focus restoration
- outside-interaction classification
- aria/linkage metadata
- default anchor resolution

---

## 5. Structural Roles

An overlay may involve these structural roles:

- `content`
- `anchor`
- `trigger`

v0 requirements:

- `content` is required
- `anchor` is optional
- `trigger` is optional

If no explicit anchor is registered, the trigger may act as the default anchor.

The contract does not require trigger and anchor to be the same node.

---

## 6. Open State

`asOverlay(...)` should minimally provide:

- `open`
- `defaultOpen`
- imperative `open()`
- imperative `close()`
- imperative `toggle()`

State changes should carry a reason-like classification where practical.

Example reasons:

- `trigger.press`
- `trigger.hover`
- `context.menu`
- `escape`
- `outside.press`
- `focus.outside`
- `item.commit`
- `controlled.sync`

The exact reason type may be refined later, but the contract should preserve the distinction between different close/open causes.

---

## 7. Dismiss Policy

v0 should support setup-time policy for at least:

- `closeOnEscape`
- `closeOnOutsidePress`
- `closeOnFocusOutside`
- `closeOnAnchorPress`
- `closeOnTriggerPress`

Component protocols may override these defaults.

Examples:

- dropdown: usually closes on item commit, escape, and outside press
- tooltip: usually does not use trigger press toggle semantics
- context menu: usually closes on outside press and escape

### 7.1 Outside Is a Derived Consumer Signal

The long-term contract direction is:

- `outside` is a derived result of interaction-boundary classification

Therefore:

- `asOverlay(...)` should not require each component to invent its own outside detection logic
- "outside press" and "focus outside" are overlay consumer behaviors, not foundational overlay-owned primitives

---

## 8. Focus Policy

`asOverlay(...)` should coordinate with the focus system rather than replacing it.

v0 should support:

- `entry`
  - examples: `first | selected | content | manual`

- `restore`
  - examples: `trigger | previous | none`

- optional local focus-scope integration

Routine policies such as "restore to trigger on close" should not require manual author scripting.

---

## 9. Placement

`asOverlay(...)` may expose host-mediated placement configuration.

v0 should only require a minimal anchored model, such as:

- `placement`
- `align`
- `sideOffset`
- `alignOffset`

The following are explicitly non-required in v0:

- arrow middleware
- collision avoidance guarantees
- cursor-follow placement
- top-layer guarantees

Adapters may provide stronger behavior, but the base contract should remain conservative.

---

## 10. Stack and Nesting

Overlays frequently nest:

- submenu inside dropdown
- tooltip inside popover
- combobox popup inside dialog

`asOverlay(...)` should therefore participate in a runtime overlay stack.

v0 should minimally support:

- knowing whether the current overlay is open
- parent/child overlay nesting participation
- excluding related trigger/content regions from naive outside-press dismissal

The contract does not require a public arbitrary overlay-query API.

---

## 11. No Portal Requirement in v0

`asOverlay(...)` must not require portal support in v0.

Inline DOM placement is the default portable model.

If a host later supports portal/teleport-like mounting, that capability should be defined at the adapter/runtime level rather than as a private overlay trick.

The logical prototype tree should remain the semantic source of truth.

---

## 12. Handle Shape

Example shape:

```ts
type OverlayHandle = {
  open: ObservedStateHandle<boolean, any>;

  show(reason?: string): void;
  hide(reason?: string): void;
  toggle(reason?: string): void;

  configure(patch: OverlayConfigPatch): void;

  registerContent(target: unknown): void;
  registerAnchor(target: unknown): void;
  registerTrigger(target: unknown): void;
};
```

Notes:

- naming may later be normalized to `open/close/toggle`
- `configure(...)` must be setup-only
- registration targets are adapter-facing and need not be public author primitives

---

## 13. Design Principle

The core boundary is:

- `asOverlay(...)` governs overlay existence, dismissal, placement, and focus coordination
- trigger hooks govern which interaction requests state change

This separation keeps overlay as a reusable structural capability while allowing dropdown, tooltip, dialog, and context menu to define their own trigger semantics.
