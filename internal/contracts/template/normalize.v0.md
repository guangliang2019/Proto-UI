# Template Normalize (v0)

This contract defines how Proto UI normalizes `TemplateChildren`.

> Scope: core template authoring syntax normalization (`normalizeChildren`).
> Non-goals: DOM patching, adapter commit behavior, or reserved runtime semantics.

---

## Why normalize?

Proto UI templates are meant to be:

- platform-agnostic
- serializable/debuggable
- deterministic across hosts

Normalization makes the authoring syntax predictable:

- arrays are flattened under a defined policy
- `null` represents "empty"
- `undefined` is illegal (portable authoring)
- booleans are illegal (avoid host-specific truthy/falsey leaks)

---

## Types (v0)

- `TemplateChild` = `TemplateNode | string | number | null`
- `TemplateChildren` = `TemplateChild | TemplateChild[] | null`

> Note: `undefined` is intentionally excluded from authoring syntax.

---

## Contract: Default Normalize Policy

The **default** normalize policy is:

- `flatten = "deep"`
- `keepNull = false`

Meaning:

### 1) `undefined` input canonicalizes to `null`

If the **top-level input** is `undefined`, the result is `null`.

Rationale: author-visible canonical empty value is `null`.

### 2) `null` children are treated as empty (removed) by default

- When `keepNull = false`, any `null` encountered inside children arrays is removed.
- If all children are removed, the final output becomes `null`.

### 3) boolean children are illegal

If a boolean is encountered at any level, normalization throws.

Rationale: booleans frequently appear in JSX-like patterns, but their meaning is host-dependent
and harms portability. Use `null` for empty, or return/omit the child entirely.

### 4) `undefined` children are illegal

If `undefined` is encountered as a child (not the top-level input), normalization throws.

Rationale: `undefined` leaks host-specific behavior and breaks portability.

### 5) array flattening

With `flatten="deep"`:

- nested arrays are recursively flattened into a single flat list.

With `flatten="shallow"`:

- one level of array is allowed
- nested arrays beyond depth=1 throw

With `flatten="none"`:

- arrays are illegal and normalization throws

### 6) canonicalization of result shape

After processing:

- if the output list is empty → return `null`
- if it contains exactly one child → return that child
- otherwise → return a flat array of children

---

## Validation boundary (important)

`normalizeChildren` (v0) **does not validate** that object children are well-formed `TemplateNode`s.

It only enforces authoring-syntax portability rules:

- flattening policy
- `null` filtering (unless `keepNull=true`)
- throwing on booleans / `undefined`

This means **any non-null object** encountered as a child may be preserved in output, even if it is
not a valid `TemplateNode` shape.

Rationale:

- Proto UI targets multiple hosts and multiple language runtimes.
- In v0, core normalization is intentionally kept lightweight.
- Stricter `TemplateNode` validation is reserved for future versions or tooling.

### What adapters should do

Adapters/compilers MUST treat normalized output as the stable input shape:

- Do not rely on receiving nested arrays (under default policy).
- Do not rely on `undefined` ever appearing.
- Treat `null` as canonical empty children.
- If a host requires strict `TemplateNode` validation, it should validate at commit/compile time
  and throw deterministic errors.

---

## Examples (default policy)

Input → Output

- `undefined` → `null`
- `null` → `null`
- `"a"` → `"a"`
- `["a", null, "b"]` → `["a", "b"]`
- `["a", ["b", ["c"]]]` → `["a", "b", "c"]`
- `[null, null]` → `null`

Throws:

- `[true]`
- `["a", undefined]`
- (when `flatten="shallow"`) `["a", ["b", ["c"]]]`
- (when `flatten="none"`) `["a"]` (array itself illegal)

Preserves objects (v0 boundary):

- `[{}]` → `{}` (not validated as TemplateNode)
- `[{ type: "div", children: "x" }]` → `{ type: "div", children: "x" }`

---
