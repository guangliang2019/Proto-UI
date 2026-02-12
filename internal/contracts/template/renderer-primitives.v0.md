# Renderer Primitives Contract (Template Authoring API v0)

This contract defines the **protocol-level semantics** of Proto UI renderer primitives
used for Template authoring.

It specifies how TemplateNodes are constructed, how arguments are interpreted,
when normalization is applied, and how slot primitives are created and defensively constrained.

---

## Scope

This contract covers:

- The API surface exposed by `createRendererPrimitives()`: `el` and `r.slot`
- Argument dispatch rules of `el()` (TemplateProps vs children)
- The allowed shape and validation rules of `TemplateProps`
- When and how `normalizeChildren` is applied, including the default policy
- Construction-time constraints of `r.slot()` and its output form

---

## Non-goals

This contract does **not** define:

- Full structural validation of `TemplateNode` or `TemplateType`
- Adapter commit / patch / diff behavior
- DOM `<slot>` semantics or Light DOM projection algorithms
- The legality of `PrototypeRef` usage (rejection is defined by a separate contract)

---

## 1. Background and Core Principles

Renderer primitives are used to construct Proto UI Templates
(platform-agnostic render blueprints).

Templates must satisfy the following invariants:

- They must be serializable and debuggable
- They MUST NOT carry host instance values
  (e.g. `HTMLElement`, `VNode`, `Fiber`, `Widget` instances)
- The canonical empty value in authoring syntax is `null`

---

## 2. API Overview

`createRendererPrimitives()` returns:

- `el(type, [props], [children])`  
  Constructs a `TemplateNode`
- `r.slot()`  
  Constructs a reserved slot node

> Note:  
> This contract defines semantics and constraints, not the exact function names
> or implementation structure.  
> Official core/runtime/adapters are expected to remain aligned to support
> contract-driven tests.

---

## 3. Data Types (v0)

### 3.1 TemplateNode

A `TemplateNode` has the following fields in v0:

- `type: TemplateType`
- `style?: TemplateStyleHandle`
- `children?: TemplateChildren`

Where:

- `TemplateType = string | PrototypeRef | ReservedType`
- `ReservedType = { kind: "slot" }`
- `TemplateChild = TemplateNode | string | number | null`
- `TemplateChildren = TemplateChild | TemplateChild[] | null`

> Note:  
> `undefined` is intentionally excluded from Template authoring syntax
> to preserve cross-host portability.

---

### 3.2 TemplateProps (Minimal Allowed Shape)

In v0, the only allowed props object accepted by `el()` is `TemplateProps`,
with the following key set:

- `style?: TemplateStyleHandle`

Any other keys are illegal.

---

## 4. `el()` Argument Dispatch Rules (Normative)

`el()` MUST support the following call forms
and interpret arguments according to fixed rules.

---

### 4.1 `el(type)`

- `props = undefined`
- `childrenInput = null`

The resulting `TemplateNode.children` MUST be `null`
(after normalization).

---

### 4.2 `el(type, a)`

If the second argument `a` is a valid `TemplateProps` object:

- `props = a`
- `childrenInput = null`

Otherwise:

- `props = undefined`
- `childrenInput = a`

---

### 4.3 `el(type, props, children)`

When three arguments are provided:

- The second argument MUST be a valid `TemplateProps`
- `childrenInput = children`

If the second argument is not a valid `TemplateProps`,
an error MUST be thrown.

---

## 5. TemplateProps Validation (Normative)

### 5.1 Allowed Props Shape

An object is considered a valid `TemplateProps` if and only if:

- It is an object (non-null)
- Its key set is empty, or contains exactly one key: `style`

Any other shape is illegal.

---

### 5.2 `style` Type Constraint

If `props.style` is present:

- It MUST be a valid `TemplateStyleHandle`
- Otherwise, an error MUST be thrown

> Note:  
> The validity of `TemplateStyleHandle` is defined by the feedback/style subsystem.
> Renderer primitives are only responsible for invoking the checker
> and rejecting invalid values.

---

## 6. Children Normalization Behavior (Normative)

### 6.1 Normalization Invocation Point

`el()` MUST apply:

```

normalizeChildren(childrenInput, normalizeOptions)

```

The result MUST be assigned to `TemplateNode.children`.

---

### 6.2 Default Normalization Policy (v0)

The default normalization policy MUST be:

- `flatten = "deep"`
- `keepNull = false`

The exact semantics of normalization are defined by
**Template Normalize (v0)**.

---

## 7. `r.slot()` Primitive (Normative)

### 7.1 Argument Constraints

`r.slot()` MUST NOT accept any arguments.

If any arguments are provided, an error MUST be thrown.

> Note:  
> Slot protocol-level constraints (anonymous, at most one, no params)
> are defined by **Template Slot (Protocol Constraint)**.
> Construction-time rejection is considered an “early failure” defense.

---

### 7.2 Output Form

`r.slot()` MUST return a `TemplateNode`
equivalent to invoking:

```

el({ kind: "slot" })

```

That is, the Template-level representation of a slot MUST be:

- `type = { kind: "slot" }`

---

## 8. Boundary Between Renderer and Adapter (Important)

### 8.1 `el()` Does Not Validate `type` Legality

In v0, `el(type, ...)` is **not required** to validate
whether `type` is a legal `TemplateType`,
and is **not required** to reject `PrototypeRef`.

Rationale:

- Renderer primitives are authoring-time tools,
  responsible for stable structure construction and normalization
- Rejection of `PrototypeRef` in Template v0
  is an adapter/commit-layer responsibility,
  defined by a separate contract

---

### 8.2 Adapter-Level Rejection of `PrototypeRef` (Reference)

When an adapter/commit implementation encounters a `TemplateNode`
whose `type` is `PrototypeRef`:

- It MUST throw an error
- The error message MUST be exactly:

```

[Template] PrototypeRef is not allowed in Template v0.

```

This rule is defined by
**No Prototype-Level Composition (v0)**.

---

## 9. Trace Map (Recommended to Keep Updated)

- Reference implementation (core):
  - `packages/core/src/template.ts`  
    (`createRendererPrimitives`, `normalizeChildren`, `TemplateNode` definitions)
- Reference implementation (adapter-web-component):
  - `packages/adapters/web-component/src/commit.ts`  
    (PrototypeRef rejection, slot shadow/light mapping, multi-slot defense)
- Related contracts:
  - `Template / Template Node v0`
  - `Template Normalize v0`
  - `No Prototype-Level Composition v0`
  - `Template Slot (Protocol Constraint)`
