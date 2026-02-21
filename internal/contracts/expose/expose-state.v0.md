# Expose State Contract (v0)

> Status: Draft – v0
>
> Expose-state defines: the component projects an internal state slot as an external read-only state handle via `def.expose.state`.
> External and internal are same-source but have different capabilities.

---

## 0. Scope and Non-goals

### 0.1 Scope (v0)

- setup-time `def.expose.state(key, handle)`
- minimal shape of external state handle
- same-source consistency
- lifecycle + error model

### 0.2 Non-goals (v0)

- no external write capability
- no scheduling/batching/ordering guarantees

---

## 1. Terminology

- **Internal State Handle**: internal state handle view
- **External State Handle**: App Maker-facing read-only handle
- **State Slot**: internal semantic slot

---

## 2. API Shape

```ts
def.expose.state(key, handle)
```

> Equivalent to `def.expose(key, handle)` with expose-state semantics.

---

## 3. Minimum Shape of External State Handle

Must provide:
- `get(): V`
- `subscribe(cb): Unsubscribe`
- `unsubscribe(token)` or unsubscribe function returned by `subscribe`

Must NOT provide:
- `set` or any write capability

### 3.1 Required meta: `spec`

External handle must include read-only `spec: StateSpec` for semantic description.

---

## 4. Same-source Consistency

- `get()` must reflect current internal value
- internal changes should notify external subscribers (minimal consistency)

Event shape should align with `StateEvent<V>` (without `run`).

---

## 5. Lifecycle

- setup-only registration
- after dispose, external `get/subscribe` must fail or be distinguishable

---

## 6. Error Model

- `def.expose.state` outside setup
- use after dispose
- external write attempts (if any)

---

## 7. Related Contracts

- expose core: `internal/contracts/expose/expose.v0.md`
- state core: `internal/contracts/state/state-v0.md`

