# rule.intent.state (v0)

## Purpose

Defines the `state` intent channel (controlled mutation).

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

- `intent.state(handle).be(value)` semantics
- Writable handle view constraints
- Layered merge and rollback
- Reason requirements

### 0.2 Non-goals (v0)

- Does not define state creation or exposure
- Does not define watcher merge behavior

---

## 1. Writable view constraints

- Writability is defined by the **state** contract
- v0 allows state intent only for writable views (e.g. Owned/Borrowed)
- Non-writable views (e.g. Observed) MUST NOT be targets

---

## 2. Layered merge & rollback

For a given state, rule intent merges via a **layer stack**:

- Each rule contributes at most one layer per state (re-declare overwrites the layer)
- Layer order follows rule declaration order (later rules are on top)
- The merged result is the top layer, while lower layers remain

When a rule deactivates:

- remove its layer
- fall back to the next layer
- if no layers remain, fall back to the most recent **non-rule** value

---

## 3. Target application

- Per evaluation cycle, a state should be set **at most once**
- Set only when merged target differs from current value

---

## 4. Reason requirements

- Rule-driven state writes **MUST** include a reason
- Reason is `any`, and may include rule-id or rule-event-id
- Runtime must distinguish rule vs non-rule changes to maintain baseline

