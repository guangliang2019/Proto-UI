# rule.when.deps.props (v0)

## Purpose

Defines which props can be observed by `when` and how props dependencies are recorded.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

- Valid props dependencies
- Dependency recording
- Re-evaluation on prop changes

### 0.2 Non-goals (v0)

- Does not define props resolution (see props contracts)
- Does not define intent execution
- No props write capability

---

## 1. Dependency Form

`when` uses `w.prop(key)`:

```ts
w.prop(key) -> { kind: "prop", key }
```

- Dependencies MUST be recorded in RuleIR
- Recording MUST be de-duplicated and deterministic

---

## 2. Value Semantics

- Rule reads **resolved props**
- Props are read-only inputs

---

## 3. Re-evaluation

- Any referenced prop change MUST trigger re-evaluation
- Scheduling may batch, but semantics must be equivalent to “change => re-evaluate”

---

## 4. Summary

- Props are valid inputs for `when`
- `when` only observes, never writes
- Changes must trigger re-evaluation

