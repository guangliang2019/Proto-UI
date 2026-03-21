> This contract specifies the Proto UI v0 base `switch` protocol.
>
> The contract applies to the switch family:
>
> - `base-switch-root` / `asSwitchRoot`
> - `base-switch-thumb` / `asSwitchThumb`

## Purpose

`switch` is a compound binary control protocol in the base prototype library.

It reuses the persistent binary semantics of `toggle`, while introducing explicit anatomy roles for internal parts.

## Anatomy

The switch family MUST define these roles:

- `root`
- `thumb`

The family MUST declare:

- `root contains thumb`

## Root Surface

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

## Thumb Surface

### Exposed methods

- `isChecked(): boolean | null`

`null` means the thumb is not currently attached to a switch root in the same anatomy domain.

## Behavioral Rules

- `switch-root` MUST include the complete `toggle` protocol surface.
- `switch-thumb` MUST join the same anatomy family as `switch-root`.
- `switch-thumb` MUST be able to read root `checked` through anatomy runtime access.
- `disabled=true` on the root MUST suppress state flips and MUST suppress `checkedChange`.

## Composition Notes

- `switch` intentionally does not define form semantics in this contract.
- Form behavior may be layered later through form-aware context integration instead of coupling it into the base switch protocol.
