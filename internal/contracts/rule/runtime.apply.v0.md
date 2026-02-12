# rule.runtime.apply — Evaluation & Plan (v0)

## Purpose

Defines how rule runtime evaluates RuleIR and produces a Plan.
Rule runtime does not touch the host directly.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

- Evaluation flow
- Plan output structure
- Adapter boundary
- Minimal wiring requirements

### 0.2 Non-goals (v0)

- Does not define rendering/scheduling strategies
- Does not define host-specific application
- Does not introduce cross-channel conflict resolution

---

## 1. Evaluation Model (v0)

Given:

- a set of RuleIR
- current observable values for dependencies

Runtime MUST:

1. evaluate each rule's `when`
2. select active rules
3. order by declaration order
4. collect intent ops
5. merge per intent channel (see `intent.compose.v0.md`)
6. output Plan by default, or be short-circuited by extensions

---

## 2. Plan Output (v0)

```ts
type RulePlanV0 = {
  kind: "style.tokens";
  tokens: string[];
};
```

- `tokens` MUST be semantic-merged
- empty token list means no active style intent

> Plan is the **default output** that carries merged semantics.  
> The executor is a separate module and can be customized by the adapter.  
> Extensions may short-circuit Plan and must assume execution responsibility.  
> As intent channels expand, Plan may expand accordingly.

---

## 3. Adapter Boundary

Adapter:

- consumes Plan
- decides scheduling and realization strategy
- ensures host reflects the latest tokens

Runtime MUST NOT:

- touch the host or bypass adapter boundary
- trigger rendering directly

Executor boundary constraints:

- default executor must use channel facades, not host APIs
- adapter may customize/replace executor via host-cap (no naming mandated)
- extensions that short-circuit Plan must execute equivalently or delegate explicitly

---

## 4. Minimal Wiring (v0)

- `deps.kind === 'prop'` MUST be wired to resolved props observation
- dependency changes MUST trigger re-evaluation

State/context deps may be stubbed in v0 tests, but MUST be present in RuleIR.

---

## 5. State Intent Application (v0)

When state intent exists:

- runtime MUST merge per-state target values first
- merge uses the layer model (see `intent.state.v0.md`)
- per evaluation cycle, each state is set **at most once**
- no set if target equals current value

---

## 6. Web Optimization Note (Recommended)

When all are true:

- `when` depends on exposed state
- adapter enables `expose-state-web` (CSS variables / DOM attributes)
- intent is only `feedback.style`

rules may compile into static selector styles and skip runtime execution.
This is semantically equivalent and recommended in v0.

---

## 7. Invariants

- evaluation MUST be deterministic
- identical inputs MUST produce identical merged results (Plan or equivalent execution)
- runtime MUST NOT bypass adapter boundary

