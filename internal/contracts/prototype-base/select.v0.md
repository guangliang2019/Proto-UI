> This contract specifies the Proto UI v0 base `select` protocol.
>
> The contract applies to the select family:
>
> - `base-select-root` / `asSelectRoot`
> - `base-select-trigger` / `asSelectTrigger`
> - `base-select-value` / `asSelectValue`
> - `base-select-content` / `asSelectContent`
> - `base-select-item` / `asSelectItem`

## Purpose

`select` is a compound single-selection protocol in the base prototype library.

It combines:

- overlay-backed open/close coordination
- trigger/content/item collaboration through anatomy
- persistent selected value semantics
- a render-consumed value region (`select-value`) that owns selected text presentation inside the prototype family

## Positioning

The v0 select protocol is intentionally narrow.

It is suitable for:

- custom non-native single selection popups
- protocol-layer selected value presentation
- validating explicit `run.update()` driven value re-render paths

It is not yet a full definition of:

- native `<select>` parity
- form submission semantics
- grouped items / sections
- multi-select
- searchable / combobox behavior
- virtualized option sets

## Anatomy

The select family MUST define these roles:

- `root`
- `trigger`
- `value`
- `content`
- `item`

The family MUST declare these containment relations:

- `root contains trigger`
- `root contains value`
- `root contains content`
- `content contains item`

## Shared Coordination

The root MUST provide a shared select coordination surface with at least:

- open snapshot
- selected value snapshot
- selected text snapshot
- popup navigation cursor snapshot

The exact transport may be:

- context in the default inline-tree case
- expose/anatomy-backed coordination as a fallback where host constraints require it

## Root Surface

### Props

- `open?: boolean`
- `defaultOpen?: boolean`
- `value?: string`
- `defaultValue?: string`
- `disabled?: boolean`
- `closeOnSelect?: boolean`

### Exposed values

- `open.get(): boolean`
- `value.get(): string`
- `textValue.get(): string`

### Behavioral Rules

- root MUST install overlay-style open/close governance
- root MUST support uncontrolled `defaultOpen`
- root MUST support uncontrolled `defaultValue`
- root MUST synchronize from controlled `open` prop updates when that prop is used
- root MUST synchronize from controlled `value` prop updates when that prop is used
- root MUST derive a stable selected text snapshot for the currently selected item

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

- trigger MUST act as the select popup trigger role
- trigger SHOULD toggle popup open state on press by default
- trigger MUST respect root disabled constraints
- trigger keyboard open behavior MAY seed navigation from the current selected value

## Value Surface

### Props

- `placeholder?: string`

### Behavioral Rules

- `select-value` MUST render the selected text owned by the select protocol
- if no selected text is available, `select-value` MAY fall back to `placeholder`
- selected text changes MUST be able to trigger a prototype-owned render refresh without requiring the host app to render that text itself

## Content Surface

### Behavioral Rules

- content MUST consume overlay capability
- content MUST participate in dismiss rules such as escape and outside press
- content SHOULD restore focus to trigger on close
- opening content SHOULD focus the selected item first, and otherwise fall back to a boundary item
- when no selected value exists yet, opening content MAY still seed a popup navigation cursor from a boundary item so keyboard roving can start immediately
- seeding that popup navigation cursor MUST NOT by itself expose any item as selected or active

## Item Surface

### Props

- `disabled?: boolean`
- `value?: string`
- `textValue?: string`
- `closeOnSelect?: boolean`

### Exposed state / values

- `active.get(): boolean`
- `selected.get(): boolean`

### Behavioral Rules

- activating an enabled item MUST request selection of that item value
- the selected item MUST be reflected through root `value` / `textValue`
- disabled items MUST suppress selection changes
- uncontrolled select SHOULD close after selection by default
- item-level `closeOnSelect` MAY override root close policy
- `selected` MUST reflect the committed select value
- `active` MUST reflect the committed select value rather than the transient popup navigation cursor
- if the select has no committed value, every item MUST expose `active.get() === false` until selection is committed
- popup roving focus MAY move independently of `active` while the popup is open

## Value Probe Note

`select-value` is intentionally part of the v0 base family because it serves as a probe for Proto UI's value-class component strategy:

- the displayed text is not delegated to the host app by default
- the family itself owns the selected text presentation boundary
- selected text updates may require explicit `run.update()`-driven render refresh

This contract therefore validates not just selection semantics, but also the current Proto UI boundary for render-consumed values.
