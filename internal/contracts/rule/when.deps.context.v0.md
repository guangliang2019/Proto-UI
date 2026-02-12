# rule.when.deps.context (v0)

## Purpose

Defines how `when` may depend on context values, including path access rules.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

- Context dependency form in RuleIR
- Static path access model
- Failure semantics for missing providers and invalid paths

### 0.2 Non-goals (v0)

- Does not define provider resolution (see context contracts)
- Does not define re-evaluation scheduling (see wiring contract)
- Does not define intent behavior

---

## 1. Context as a when dependency

A context dependency in RuleIR MUST include:

- a context key (`ContextKey<T>`)
- an optional static access path

Semantically, the rule depends on the **current value** resolved for that key.

v0 facts:

- context values MUST be JSON-serializable
- value is either `null` or a plain object
- context MUST NOT contain state handles

---

## 2. Path access model

### 2.1 Path definition

- Path is a static ordered list of string keys
- Fully serializable
- No functions, computed keys, or dynamic expressions

In RuleIR:

```ts
{
  type: "context",
  key: ContextKey<any>,
  path?: string[]
}
```

### 2.2 Allowed traversal targets

During evaluation:

- Only plain objects are traversed
- No getters or user-defined functions
- Context values are treated as readonly

If a non-object is encountered before the path ends, access fails.

---

## 3. Failure semantics

### 3.1 Missing provider

If no provider exists for the referenced key:

- the context value is `null`

### 3.2 Path access failure

If traversal fails due to missing keys or non-objects:

- result is `null`
- evaluation MUST continue without throwing

---

## 4. Equality & comparison

Context-derived values participate in `when` conditions using normal rule semantics.
No extra equality guarantees are provided.

---

## 5. State handle prohibition (v0)

State handles are forbidden in context.
If detected, treat as invalid structure and resolve to `null`.

---

## 6. Diagnostics (recommended)

Implementations SHOULD provide diagnostics when:

- a rule references a context key with no provider
- a path consistently resolves to `null`
- a path attempts to traverse non-serializable structures

Diagnostics MUST NOT alter semantics.

---

## 7. Summary

- Context dependency is declarative and serializable
- Missing providers or invalid paths resolve to `null`
- No state handles in context

