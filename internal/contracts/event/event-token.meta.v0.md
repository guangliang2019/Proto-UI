# Event Token Metadata Contract (v0)

> Status: Draft – implementation-aligned  
> Version: v0
>
> This document defines the **minimum readable metadata carried by
> EventListenerToken**, intended to improve code readability, diagnostics,
> and traceability.
>
> This document is **normative**.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

This contract specifies that:

- `EventListenerToken` **MUST** carry minimal readable metadata to express:
  - what kind of event registration it represents
  - the event type and its binding scope
- Metadata **MUST remain stable** for the lifetime of the token.
- Metadata is **for human understanding and diagnostics only** and MUST NOT
  participate in event matching or dispatch logic.

### 0.2 Non-goals (v0)

The following are explicitly out of scope:

- Using metadata for event cancellation, deduplication, or dispatch decisions
- Requiring structured or enumerable semantic classification fields
- Requiring adapters or runtime to interpret token metadata
- Strong coupling with tracing or profiling systems

---

## 1. EventListenerToken Shape (v0)

An `EventListenerToken` **MUST** contain the following fields:

- `id: string`

  - an opaque, stable unique identifier
  - used only to precisely identify a single event registration

- `meta: EventTokenMeta`
  - a readable metadata object describing the semantic meaning of this token

### 1.1 EventTokenMeta (Minimum Requirements)

The `meta` object **MUST** include:

```ts
{
  kind: "root" | "global";
  type: string;
}
```

Semantic meaning:

- `kind`

  - `"root"`: bound to the component instance’s root interaction target
  - `"global"`: bound to an adapter-defined global interaction target

- `type`

  - the event type string (e.g. `"press.commit"`, `"pointer.down"`, `"native:click"`)
  - validity is defined by the Event Type contract
  - represented as `string` rather than a concrete union to avoid version coupling

### 1.2 Optional Fields (v0)

The `meta` object **MAY** include the following fields:

```ts
{
  options?: unknown;
  label?: string;
}
```

- `options`

  - original listener options (or a summarized form)
  - for diagnostic display only
  - **MUST NOT** be used for event matching or behavior decisions

- `label`

  - a human-readable description
  - set via `token.desc()` (see below)

---

## 2. Token Description (`desc`) Semantics

`EventListenerToken` **MUST** provide the following method:

```ts
token.desc(text: string): EventListenerToken
```

### 2.1 Rules (Normative)

- `desc()` **MUST be setup-only**

  - calls after setup **MUST throw a phase-violation error**

- `desc()` **MUST return the same token instance**
- In development builds:

  - `desc(text)` **SHOULD** record the text into `token.meta.label`

- In production builds:

  - `desc()` **MAY** be a no-op
  - but **MUST be callable** and return the same token

### 2.2 Semantic Constraints

- `label` is for description and diagnostics only
- It MUST NOT affect event registration, binding, dispatch, or removal behavior

---

## 3. Consistency Requirements

- `token.meta.kind` and `token.meta.type` **MUST** match the
  `def.event.on` / `def.event.onGlobal` call that created the token
- After token creation, all `meta` fields except `label`
  **MUST NOT be mutated**
- Internal implementation changes **MUST NOT affect**
  already-exposed token metadata

---

## 4. Consistency with Diagnostics (Optional)

If the event module provides diagnostics (e.g. `getDiagnostics()`):

- the token’s `id`, `kind`, `type`, and `label`
  **SHOULD** be representable in diagnostic output
- diagnostics **MUST NOT** be a prerequisite for token metadata existence

---

## 5. Design Notes (Informative)

The intent of this contract is:

- to allow Component Authors to understand “what this token represents”
  directly from the token itself
- without requiring knowledge of the event system’s internal structure

An EventListenerToken is:

- a **registration handle**
- a **semantic label**
- not a control surface for the event system

Any design that relies on token metadata for behavioral decisions
is outside the scope of v0.
