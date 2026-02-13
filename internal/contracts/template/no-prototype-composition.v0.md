# Template Contract: No Prototype-Level Composition (v0)

This contract defines the constraint that **prototype-level composition is forbidden** within Proto UI Template syntax in v0.

---

## Status

- Version: v0
- Scope: **Template** (render output language)
- Applies to: official Proto UI adapters / compilers

---

## Summary

In v0, Proto UI **does not define and does not allow** prototype-level composition inside Template.

Any `TemplateNode` **MUST NOT** use `PrototypeRef` as its `type`.

Composition between components is expected to occur at the **host layer** (e.g. React, Vue, Web Components, Vanilla platforms), using the composition mechanisms provided by the host environment.

---

## Required Adapter Behavior (Normative)

### Rule

When an adapter processes a Template and encounters a `TemplateNode` whose `type` is `PrototypeRef`, it **MUST throw an error**.

This behavior is classified as **mandatory rejection semantics**.

---

### Required Error Signature (v0)

The error message **MUST** be exactly:

```

[Template] PrototypeRef is not allowed in Template v0.

```

This requirement exists so that contract behavior can be mechanically verified across different adapters.

---

### Notes

- This contract specifies **rejection semantics**, not authoring convenience or usage guidance.
- Even if advanced users construct invalid Template objects via `as any` or equivalent unsafe mechanisms, official adapters **MUST** reject such input deterministically.
- Adapters **MUST NOT** attempt to “support”, “work around”, or indirectly enable composition via `PrototypeRef`.

---

## Plain Explanation (Informative)

This contract can be summarized in one sentence:

> **Inside the template structure of a prototype, another prototype must never appear.**

Template syntax describes the **structure inside the host root node**, not composition relationships between components.

Any attempt to “nest” another Prototype inside a Template is **illegal** in Proto UI v0.

---

### Common Illegal Patterns (Informative)

The following patterns are **explicitly disallowed** in Proto UI v0:

- Using a `PrototypeRef` as the `type` of a TemplateNode
- Passing a Prototype as the tag/type argument to `renderer.el(...)`
- Any equivalent expression that effectively means “using another prototype directly inside a template”

Even if such patterns are common or reasonable in certain host frameworks (e.g. React), they **MUST be rejected** at the Template layer in Proto UI.

---

### Implications for Adapter Implementers (Informative)

This contract not only forbids a defined incorrect usage, but also requires adapters to **actively reject a usage that is semantically nonexistent**.

Specifically:

- An adapter **MUST NOT** treat `PrototypeRef` as a valid Template node type
- An adapter **MUST** throw the predefined contract error when such input is detected
- An adapter **MUST NOT** attempt to support, downgrade, or tolerate this input

This explicit rejection behavior serves to demonstrate that an adapter **strictly adheres to the semantic boundaries of Template v0**, rather than applying permissive or speculative handling to invalid input.

---

## Rationale

Proto UI is intentionally designed as a protocol system that maintains a strict separation between two planes:

- The **Prototype ecosystem**  
  used for defining component prototypes and interaction semantics (Component Authoring)
- The **Adapter / Compiler ecosystem**  
  used for integrating prototypes into concrete host environments (Host Integration)

Excluding prototype-level composition from the Template layer is a deliberate design decision, for the following reasons:

1. Prototype-level composition significantly increases adapter/compiler complexity across multiple host environments
2. It pushes Proto UI toward a framework-like authoring model, rather than a protocol-based description system
3. It adds little semantic value when `slot`, `context`, and host-level composition mechanisms already cover most use cases
4. It blurs the mental model: a Prototype effectively “invents a new host element”

Proto UI explicitly prioritizes **stable and strict semantic boundaries** over authoring convenience.

---

## Definitions (Informative)

### Allowed `TemplateNode.type` (v0)

- `string`  
  (representing a host element tag or equivalent concept)
- `ReservedType`  
  (e.g. `{ kind: "slot" }`, as defined by separate contracts)

---

### Disallowed `TemplateNode.type` (v0)

- `PrototypeRef`

---

## Relationship to Other Contracts

- The structure and role of TemplateNodes are defined in **Template / Template Node v0**
- Normalization rules for `TemplateChildren` are defined in **Template Normalize v0**
- Prototype definition and composition are governed jointly by Prototype, Adapter, and Host-level contracts

---

## Trace Map (Recommended to Keep Updated)

- Reference tests (Web Component adapter):
  - `packages/adapters/web-component/test/commit.test.ts`
- Related contracts:
  - `internal/contracts/template/normalize.v0.md`
