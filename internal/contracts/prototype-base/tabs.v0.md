> This contract specifies the Proto UI v0 base `tabs` protocol.
>
> The contract applies to the tabs family:
>
> - `base-tabs-root` / `asTabsRoot`
> - `base-tabs-list` / `asTabsList`
> - `base-tabs-trigger` / `asTabsTrigger`
> - `base-tabs-content` / `asTabsContent`

## Purpose

`tabs` is a compound single-selection protocol in the base prototype library.

It combines anatomy and context:

- anatomy defines the family structure
- context distributes the current selected tab snapshot

## Anatomy

The tabs family MUST define these roles:

- `root`
- `list`
- `trigger`
- `content`

The family MUST declare these containment relations:

- `root contains list`
- `list contains trigger`
- `root contains content`

## Shared Context

The root MUST provide a shared tabs context with:

- `value: string`
- `orientation: "horizontal" | "vertical"`
- `activationMode: "automatic" | "manual"`

Triggers and content parts MUST subscribe to this context.

## Root Surface

### Props

- `value?: string`
- `defaultValue?: string`
- `orientation?: "horizontal" | "vertical"`
- `activationMode?: "automatic" | "manual"`

### Exposed values

- `value.get(): string`

## Trigger Surface

### Props

- `value?: string`
- `disabled?: boolean`

### Exposed state / values

- `disabled: boolean`
- `hovered: boolean`
- `focused: boolean`
- `focusVisible: boolean`
- `pressed: boolean`
- `selected.get(): boolean`

### Exposed events

- `click`

## Content Surface

### Props

- `value?: string`

- `current.get(): boolean`

## Behavioral Rules

- `tabs-root` MUST provide the shared tabs context.
- `tabs-root` MUST support uncontrolled `defaultValue`.
- `tabs-root` MUST synchronize from controlled `value` prop updates when that prop is used.
- `tabs-trigger` MUST derive `selected` from the shared tabs context.
- `tabs-content` MUST derive `current` from the shared tabs context.
- activating an enabled trigger MUST request selection of that trigger value.
- `disabled=true` on a trigger MUST suppress selection changes.
- `activationMode="automatic"` MAY activate a trigger when it receives focus.

## Composition Notes

- This contract does not yet define roving focus behavior.
- Focus-group navigation may be added later through a dedicated privileged focus protocol.
