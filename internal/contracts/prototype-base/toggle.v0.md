> This contract specifies the Proto UI v0 base `toggle` protocol.
>
> The contract applies equally to:
>
> - `base-toggle`
> - `asToggle`

## Purpose

`toggle` is the minimal persistent binary trigger in the base prototype library.

It builds on the `button` protocol and adds a stable binary value.

## Required Surface

### Props

- `checked?: boolean`
- `defaultChecked?: boolean`
- `disabled?: boolean`

### Exposed state

- `disabled: boolean`
- `hovered: boolean`
- `focused: boolean`
- `focusVisible: boolean`
- `pressed: boolean`
- `checked: boolean`

### Exposed events

- `click`
- `checkedChange` with payload `{ checked: boolean }`

## Behavioral Rules

- `toggle` MUST include the complete `button` protocol surface.
- `checked` MUST represent persistent binary value, distinct from transient `pressed`.
- If `checked` is provided, `toggle` MUST behave as controlled and treat the prop as source of truth.
- If `checked` is not provided, `toggle` MUST initialize from `defaultChecked` and manage `checked` internally.
- `press.commit` while enabled MUST request a binary flip and emit `checkedChange`.
- `disabled=true` MUST suppress binary changes and MUST suppress `checkedChange`.

## Composition Notes

- `toggle` is the recommended protocol substrate for higher-level binary trigger components.
- `switch` may reuse parts of this behavior, but remains a distinct protocol with its own anatomy.
