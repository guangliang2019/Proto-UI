# rule.intent.feedback.style (v0)

## Purpose

Defines the `feedback.style` intent channel in rule.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

- `feedback.style.use` form
- Supported handle types and token constraints
- Merge and rollback semantics (via semantic merge)

### 0.2 Non-goals (v0)

- Does not define CSS realization
- Does not define adapter scheduling

---

## 1. Supported Handles (v0)

- Only Tailwind-style `tw` handles are allowed
- Token syntax follows feedback v0 constraints

Unsupported handle kinds MUST throw during compilation.

---

## 2. Merge Semantics (v0)

- Runtime collects `feedback.style.use` in rule declaration order
- Tokens are concatenated and passed to feedback semantic merge
- When rules deactivate, their tokens are removed in the next evaluation

This channel is **semantic-merge**, not last-wins.

---

## 3. Runtime Execution & Optimization (v0)

- Runtime MAY dynamically apply `feedback.style` based on rule evaluation
- In specific cases, rules MAY be compiled into static styles and skip runtime execution
- Concrete optimizations are adapter/extension responsibilities
