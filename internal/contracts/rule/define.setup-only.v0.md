# rule.define — Setup-only Declaration Contract (v0)

## Purpose

This contract defines how rules are declared during setup and compiled into RuleIR. Rule declarations are static and must not depend on runtime state.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

- `def.rule(spec)` is setup-only
- RuleSpec shape and constraints
- RuleIR structure and invariants
- Deterministic ordering of active rules
- Error boundaries

### 0.2 Non-goals (v0)

- Does not define when/intent semantics (see corresponding contracts)
- Does not define runtime evaluation (see `runtime.apply.v0.md`)
- No runtime rule declaration

---

## 1. API Shape (v0)

```ts
def.rule(spec: RuleSpec<Props>): void
```

Calling `def.rule` outside setup **MUST throw**.

---

## 2. RuleSpec (v0)

```ts
type RuleSpec<Props> = {
  label?: string;
  note?: string;

  when: (w: WhenBuilder<Props>) => WhenExpr<Props>;
  intent: (i: IntentBuilder) => void;
};
```

Rules:

- `when` MUST be constructed via `WhenBuilder`
- `intent` MUST be recorded via `IntentBuilder`
- RuleSpec must be fully static during setup
- No runtime closures may escape into RuleIR

---

## 3. Compilation Output: RuleIR (v0)

```ts
type RuleIR<Props> = {
  label?: string;
  note?: string;

  deps: RuleDep<Props>[];
  when: WhenExpr<Props>;
  intent: RuleIntent;
};
```

### 3.1 RuleIR Invariants

- RuleIR MUST be pure data
- RuleIR MUST be serializable in principle
- RuleIR MUST NOT contain functions or host references

---

## 4. Ordering (v0)

When multiple rules are active:

1. Order by declaration order only

Intents apply in this deterministic order. Conflict resolution is delegated to semantic merge.

---

## 5. Errors

The following MUST throw synchronously:

- calling `def.rule` outside setup
- using non-builder values inside `when`
- using unsupported operations inside `intent`
