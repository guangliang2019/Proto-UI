# rule.when — Condition Expression Contract (v0)

## Purpose

Defines the condition language used by rule declarations.
Conditions are declarative, analyzable, and dependency-tracked.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

- WhenExpr AST
- WhenValue inputs and semantics
- WhenBuilder dependency recording
- Equality and logical semantics

### 0.2 Non-goals (v0)

- No runtime scheduling policy (see wiring contracts)
- No deep comparison or custom comparators
- No side effects or imperative logic

---

## 1. WhenExpr AST (v0)

```ts
type WhenExpr<Props> =
  | { type: "true" }
  | { type: "false" }
  | { type: "eq"; left: WhenValue<Props>; right: WhenLiteral }
  | { type: "not"; expr: WhenExpr<Props> }
  | { type: "all"; exprs: WhenExpr<Props>[] }
  | { type: "any"; exprs: WhenExpr<Props>[] };
```

```ts
type WhenValue<Props> =
  | { type: "prop"; key: keyof Props }
  | { type: "state"; id: StateId }
  | { type: "context"; key: ContextKey<any> };

type WhenLiteral = string | number | boolean | null;
```

---

## 2. WhenBuilder Rules

`WhenBuilder` is setup-only and MUST record dependencies.

```ts
w.prop(key)   -> { kind: "prop", key }
w.state(s)    -> { kind: "state", id: s.id }
w.ctx(key)    -> { kind: "context", key }
```

Dependency recording MUST be:

- complete
- de-duplicated
- deterministic (first-seen order recommended)

---

## 3. eq Semantics (v0)

- Uses JS strict equality (`===`)
- No deep comparison in v0

---

## 4. Logical Operators

- `all([])` => true
- `any([])` => false
- Otherwise follow standard truth tables

---

## 5. Events & Reversibility (v0)

- v0 rules accept **state-shaped inputs only**
- `when(event.happens)` is **not allowed**
- Event dimensions must be represented as reversible state pairs (e.g. pressed/released)

---

## 6. Invariants

- Evaluation MUST be pure
- No side effects during evaluation
- Identical inputs MUST yield identical results

