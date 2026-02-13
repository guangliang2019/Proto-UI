# Template Contracts – Trace Map (v0)

This document provides a **trace map** between Template-related contracts, their reference implementations, and executable verification points.

Its purpose is to ensure that Template semantics in Proto UI are:

- **precisely defined**
- **mechanically verifiable**
- **stable across adapters and hosts**

This trace map is normative for v0.

---

## Scope

This trace map covers contracts related to:

- Template authoring syntax
- Template normalization
- Reserved template nodes (slot)
- Adapter consumption of Template output
- Explicitly disallowed behaviors at Template level

It does **not** cover:

- Diff / patch strategies
- Lifecycle scheduling details
- Props / state / event / feedback APIs (see respective modules)

---

## Core / Template (v0)

### Template Normalize (v0)

**Contract**

- `internal/contracts/template/normalize.v0.md`

**Implementation**

- `packages/core/src/template.ts`
  - `normalizeChildren`
  - `DEFAULT_NORMALIZE`

**Verification**

- Contract runner:
  - `packages/core/test/contracts/template.normalize.v0.contract.test.ts`
- Case definitions:
  - `packages/core/test/cases/normalize.v0.cases.ts`

**Verified Semantics**

- `undefined` input canonicalizes to `null`
- Default policy: deep flatten + `keepNull = false`
- `null` treated as empty by default
- Boolean children MUST throw
- `undefined` children MUST throw
- Canonical result shape:
  - empty → `null`
  - single child → that child
  - multiple → flat array
- v0 boundary: object children are preserved without TemplateNode validation

---

### Template Slot (Protocol Constraint, v0)

**Contract**

- `internal/contracts/template/slot.v0.md`

**Core Implementation**

- `packages/core/src/template.ts`
  - `createRendererPrimitives().r.slot()`

**Adapter Implementation (Web Component)**

- `packages/adapters/web-component/src/commit.ts`
  - Shadow DOM slot mapping
  - Light DOM projection
  - Defensive rejection (multiple / named slot)

**Verification**

- Core contract:
  - `packages/core/test/contracts/template.slot.v0.contract.test.ts`
- Adapter (Web Component):
  - `packages/adapters/web-component/test/contract/template.slot.protocol.v0.contract.test.ts`
  - `packages/adapters/web-component/test/contract/slot-light-dom.v0.contract.test.ts`

**Verified Semantics**

- Slot is anonymous (`r.slot()` takes no arguments)
- At most one slot per template output
- Slot carries no params or props
- Shadow DOM:
  - slot renders as native `<slot>`
- Light DOM:
  - no `<slot>` element is rendered
  - external children are projected in order
  - prefix / suffix siblings are preserved
  - text nodes are supported
  - update / MutationObserver MUST NOT duplicate or drop projected nodes

---

### Renderer Primitives (Template Authoring API, v0)

**Contract**

- Implicit in Template Normalize / Slot contracts (no standalone v0 document)

**Implementation**

- `packages/core/src/template.ts`
  - `createRendererPrimitives`
  - `el(type, props?, children?)`

**Verification**

- `packages/core/test/contracts/template.renderer-primitives.v0.contract.test.ts`

**Verified Semantics**

- `el(type, {})` treats `{}` as valid TemplateProps
  - resulting `children === null`
- `el()` MUST normalize children using default normalize policy
- Invalid TemplateProps MUST throw:
  - illegal keys
  - non-`TemplateStyleHandle` style values
  - non-object props in 3-argument form

---

## Adapter / Template Consumption (v0)

### No Prototype-Level Composition (v0)

**Contract**

- `internal/contracts/template/no-prototype-composition.v0.md`

**Implementation (Web Component Adapter)**

- `packages/adapters/web-component/src/commit.ts`
  - `createElementForType`
  - `ERR_TEMPLATE_PROTOTYPE_REF_V0`

**Verification**

- `packages/adapters/web-component/test/contract/template.no-prototype-composition.v0.contract.test.ts`

**Verified Semantics**

- `TemplateNode.type === PrototypeRef` MUST be rejected
- Adapter MUST throw the required v0 error signature
- Prototype-level composition is not supported at Template layer

---

## Notes

- This trace map is **version-scoped** (v0).
- New Template-related contracts MUST:
  1. Declare their scope explicitly
  2. Add at least one verification entry to this document
- Frameworks built on top of Proto UI may expose richer authoring APIs, but MUST compile down to the semantics verified here.

---

## Status

- Template contracts: **closed for v0**
- Trace map completeness: **sufficient for v0 freeze**
