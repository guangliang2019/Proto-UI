> This contract specifies the Proto UI v0 base `button` protocol.
>
> The contract applies equally to:
>
> - `base-button`
> - `asButton`

## Purpose

`button` is the minimal trigger-style component in the base prototype library.

It establishes the shared trigger interaction lane used by higher-level components such as `toggle`.

## Required Surface

### Props

- `disabled?: boolean`

### Exposed state

- `disabled: boolean`
- `hovered: boolean`
- `focused: boolean`
- `focusVisible: boolean`
- `pressed: boolean`

### Exposed events

- `click`

## Behavioral Rules

- `button` MUST install trigger semantics through the official privileged trigger path.
- `button` MUST expose focus semantics through the official focus domain.
- `disabled=true` MUST suppress `click`.
- `disabled=true` MUST clear transient interaction states such as `hovered` and `pressed`.
- `press.commit` while enabled MUST emit `click`.
- `pressed` in this contract means transient press interaction state, not a persistent toggle value.

## Composition Notes

- `button` is intended to be reused as a behavior substrate by other base prototypes.
- Higher-level protocols MUST NOT reinterpret the exposed `pressed` state as a persistent binary selection state.
