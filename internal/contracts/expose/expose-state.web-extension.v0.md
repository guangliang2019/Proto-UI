# expose-state.web-extension.v0.md

> Status: Draft – v0
>
> This document defines the **Web extension for expose-state**:
> mapping external state handles to DOM `data-*` attributes and CSS variables
> to support headless component styling and selector-based consumption.
>
> **Positioning (v0):** this is an **optional Web-only extension**.
> It does not change expose-state semantics; it only provides an additional presentation mapping.

---

## 0. Scope and Non-goals

### 0.1 Scope (v0)

This extension provides on Web:

- Mapping external state handles to DOM `data-*` attributes and CSS variables
- A configurable semantic-name → attr/var name strategy
- Subscription-based synchronization aligned with expose-state

### 0.2 Non-goals (v0)

- Does not change the external handle shape
- Does not allow write (`set`) capabilities
- No cross-platform guarantees (Web adapter only)

---

## 1. Terminology

- **Web extension module**: optional module that maps expose-state to DOM.
- **NameMap**: semantic name → `data-*` / `--pui-*` mapping strategy.
- **Host Element**: the DOM node representing the component instance.

---

## 2. Dependencies and Caps

The Web extension depends on caps provided by the adapter:

- `HOST_ELEMENT_CAP`: host DOM element
- `EXPOSE_STATE_WEB_MAP_CAP`: NameMap (semantic → attr/css var)
- `EXPOSE_STATE_WEB_MODE_CAP` (optional): behavior overrides

> Caps are optional: if absent, the extension must no-op and not error.

---

## 3. Default Mapping Rules (v0)

### 3.1 Semantic name → DOM names

Default mapping (based on state semantic name):

- `btn.disabled` → `data-btn-disabled` and `--pui-btn-disabled`
- Rules:
  - trim whitespace
  - `.` and spaces become `-`
  - non-alphanumeric chars become `-`
  - lowercase

### 3.2 Type-driven mapping

- **Enum** (`enum`): attr only
  - `data-name=value`
- **String** (`string`): attr only
  - `data-name=value`
- **Boolean** (`bool`): attr only
  - `true` → `data-name` (empty string value)
  - `false` → remove `data-name`
- **Discrete number** (`number.discrete`): attr + css var
  - `data-name=value`
  - `--pui-name=value`
- **Continuous number** (`number.range`): css var only
  - `--pui-name=value`

> Rationale: continuous values are not mapped to attrs by default to avoid noisy DOM updates.

---

## 4. Overrides (v0)

Adapters may override defaults via `EXPOSE_STATE_WEB_MODE_CAP`, e.g.

- `allowContinuousAttr`: allow continuous numbers to map to attrs
- `allowStringVar`: allow enum/string to map to CSS vars

Overrides affect only Web mapping behavior, not expose-state semantics.

---

## 5. Lifecycle and Synchronization

- Mapped values must stay in sync with expose-state
- Subscriptions and mappings must be cleaned up after dispose

---

## 6. v0 Contract Tests (minimum coverage)

At minimum:

1. bool → attr (true/false semantics)
2. enum/string → attr
3. number.discrete → attr + css var
4. number.range → css var
5. semantic name mapping rules (`.` and spaces → `-`)

---

## 7. Related Contracts (non-normative)

- expose-state core: `internal/contracts/expose/expose-state.v0.md`
- state spec: `packages/types/src/state.ts`
