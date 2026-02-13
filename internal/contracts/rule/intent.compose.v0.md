# rule.intent.compose (v0)

## Purpose

Defines the intent structure, builder shape, and cross-channel composition principles. Channel-specific semantics are defined by their own intent contracts.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

- IntentBuilder shape and setup-only constraint
- RuleIntent / RuleOp structure
- Cross-channel composition principles

### 0.2 Non-goals (v0)

- Does not define per-channel semantics
- Does not introduce channel priority
- No imperative callbacks

---

## 1. IntentBuilder (v0)

```ts
interface IntentBuilder {
  feedback: {
    style: {
      use(...handles: StyleHandle[]): void;
    };
  };
  state: <T>(handle: OwnedStateHandle<T> | BorrowedStateHandle<T>) => StateIntentBuilder<T>;
}

interface StateIntentBuilder<T> {
  be(value: T): void;
}
```

Rules:

- IntentBuilder is setup-only
- It records intent ops; it does not execute them

---

## 2. RuleIntent (v0)

```ts
type RuleIntent = {
  kind: 'ops';
  ops: RuleOp[];
};

type RuleOp =
  | { kind: 'feedback.style.use'; handles: StyleHandle[] }
  | {
      kind: 'state.set';
      handle: OwnedStateHandle<any> | BorrowedStateHandle<any>;
      value: any;
      reason: any;
    };
```

- Multiple ops MAY be recorded per rule
- Op order MUST be preserved

---

## 3. Cross-channel composition (v0)

- Runtime collects ops from active rules in **declaration order**
- Each intent channel is merged independently
- Channel merge rules are defined by each intent contract

---

## 4. Non-goals

v0 does NOT provide:

- arbitrary side effects
- author callbacks
- host-specific execution logic

These belong to adapters or future extensions.
