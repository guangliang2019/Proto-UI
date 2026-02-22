# Expose Channel Contract (v0)

> Status: Draft – v0
>
> Expose is the **Component → App Maker** output channel, dual to props. In v0, expose is a registration-based output API and does not include subscription, dependency tracking, or automatic updates.

---

## 0. Scope and Non-goals

### 0.1 Scope (v0)

Expose v0 provides:

- setup-time `def.expose(...)` registration
- stable mapping by key for App Maker access
- adapter access by key and full map
- strict phase constraint (setup-only)
- lifecycle constraints (invalid after dispose)

### 0.2 Non-goals (v0)

v0 does **not** guarantee:

- automatic update/subscription semantics
- serializability or portability constraints
- runtime mutation of the expose map
- expose-driven event/render/state scheduling
- strong validation of exposed values

---

## 1. Terminology

- **Expose channel**: output channel from component to App Maker
- **Expose key**: string key used to register an item
- **Expose value**: value registered via `def.expose`
- **Exposes record**: map returned by adapter (`Record<string, unknown>`)
- **OutputAPI**: `E` in `Prototype<P, E>`

---

## 2. Type Convention (Prototype Generics)

- `Prototype<P, E>`: `P` is InputAPI (props), `E` is OutputAPI (exposes)
- v0 only requires type-level modeling, no runtime reflection

---

## 3. Definition API: `def.expose` (setup-only)

### 3.1 Signature

```ts
def.expose<K extends keyof E>(key: K, value: E[K]): void
```

### 3.2 Rules

1. Must be called in setup only; otherwise throw
2. `key` must be a string at runtime; non-string throws
3. Duplicate key within an instance must throw
4. Expose is registration-based: the registered value is stored as-is

> If change notifications are needed, expose a state handle or explicit subscribe API.

---

## 4. App Maker Access (adapter responsibility)

- allow per-key access
- allow full-map access (`Record<string, unknown>`)
- keys must match those registered via `def.expose`

---

## 5. Lifecycle

- after dispose, exposes are invalid
- reads/invocations on disposed instances must fail or be distinguishable

---

## 6. Recommended Usage (informative)

Recommended:

- **imperative methods** (e.g. `focus`, `reset`)
- **state handles** (via expose-state)
- **constants / static config**

Not recommended:

- mutable values without subscription

---

## 7. Error Model (v0)

Must error for:

- `def.expose` outside setup
- non-string key
- duplicate key
- access after dispose

Suggested error codes:

- `EXPOSE_PHASE_VIOLATION`
- `EXPOSE_INVALID_KEY`
- `EXPOSE_DUPLICATE_KEY`
- `EXPOSE_DISPOSED`

---

## 8. Related Contracts (non-normative)

- props: `internal/contracts/props/*.v0.md`
- expose-state: `internal/contracts/expose/expose-state.v0.md`
- event: `internal/contracts/event/*.v0.md`
