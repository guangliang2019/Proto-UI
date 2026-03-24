> This contract specifies the Proto UI v0 base `dropdown` protocol.
>
> The contract applies to the dropdown family:
>
> - `base-dropdown-root` / `asDropdownRoot`
> - `base-dropdown-trigger` / `asDropdownTrigger`
> - `base-dropdown-content` / `asDropdownContent`
> - `base-dropdown-item` / `asDropdownItem`

## Purpose

`dropdown` is an anchored action/menu-like overlay protocol in the base prototype library.

It combines:

- overlay governance for open/close/dismiss/focus
- trigger semantics for press-driven toggle
- family structure for trigger/content/item collaboration

## Positioning

The v0 dropdown protocol is intentionally narrow.

It is suitable for:

- action menus
- simple menu-button scenarios
- basic overlay item commit flows

It is not yet a full definition of:

- menubar
- checkbox/radio menu item semantics
- submenu semantics
- typeahead
- full WAI-ARIA menu behavior parity

## Anatomy

The dropdown family MUST define these roles:

- `root`
- `trigger`
- `content`
- `item`

The family MUST declare these containment relations:

- `root contains trigger`
- `root contains content`
- `content contains item`

## Shared Coordination

The root MUST provide a shared dropdown coordination surface with at least:

- open snapshot
- trigger/content registration
- imperative open/close/toggle methods

The exact transport may be:

- context in the default inline-tree case
- expose/anatomy-backed coordination as a fallback where host constraints require it

The protocol MUST NOT require DOM relocation or portal support.

## Root Surface

### Props

- `open?: boolean`
- `defaultOpen?: boolean`
- `disabled?: boolean`

### Exposed values

- `open.get(): boolean`

### Behavioral Rules

- root MUST install overlay governance
- root MUST support uncontrolled `defaultOpen`
- root MUST synchronize from controlled `open` prop updates when that prop is used
- root MUST expose imperative open/close/toggle behavior for family members

## Trigger Surface

### Props

- `disabled?: boolean`

### Exposed state / values

- `disabled: boolean`
- `hovered: boolean`
- `focused: boolean`
- `focusVisible: boolean`
- `pressed: boolean`

### Behavioral Rules

- trigger MUST act as a dropdown trigger role
- trigger SHOULD use press-driven toggle behavior by default
- trigger MUST respect root/item disabled constraints
- trigger behavior MUST translate user interaction into overlay open/close/toggle requests
- trigger MUST NOT define overlay dismissal policy by itself

## Content Surface

### Behavioral Rules

- content MUST consume overlay capability
- content MUST participate in dismiss rules such as escape and outside press
- content SHOULD participate in focus entry/restore policy
- content MAY register itself as the overlay content node
- content MAY use the trigger as the default anchor when no explicit anchor exists

## Item Surface

### Props

- `disabled?: boolean`

### Behavioral Rules

- activating an enabled item MUST emit an item-commit-like outcome
- enabled item commit SHOULD close the dropdown by default
- disabled items MUST suppress commit behavior
- item selection semantics are protocol-specific and not owned by `asOverlay(...)`

## Composition Notes

- `asDropdownTrigger(...)` is expected to own trigger interaction semantics
- `asDropdownContent(...)` is expected to own overlay-content semantics by consuming `asOverlay(...)`
- if future hosts support portal/teleport behavior, dropdown should consume that through a host capability rather than through a dropdown-private mechanism
