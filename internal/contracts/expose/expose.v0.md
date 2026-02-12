# expose.v0.md

> Status: Draft – v0
>
> This contract defines the **expose information channel** in Proto UI v0:
> a component uses `def.expose` to actively publish output APIs to the App Maker.
> The direction is **Component → App Maker**, the dual of props (App Maker → Component).
>
> **Positioning (v0):** expose is a registration-based output API binding.
> It does not provide subscription, dependency tracking, or automatic updates for exposed values.

---

## 0. Scope and Non-goals

### 0.1 Scope (v0)

Expose in v0 provides:

- setup-time `def.expose(key, value)` registration
- stable mapping keyed by `key` for App Maker access
- adapter capability to access single or all exposes
- strict execution-phase constraint (setup-only)
- lifecycle constraints (invalid after dispose)

### 0.2 Non-goals (v0)

v0 explicitly does not provide or guarantee:

- any automatic update or subscription semantics
- serializability or portability constraints on exposed values
- runtime mutation of the expose mapping
- event, render, or state scheduling driven by expose
- strong validation of exposed values (only recommended usage)

---

## 1. Terminology

- **Expose channel**: the output channel from Component to App Maker.
- **Expose key**: the string key used to register and look up an expose item.
- **Expose value**: the value registered via `def.expose` (methods, handles, constants).
- **Exposes record**: the map returned by the host, shaped as `Record<string, unknown>`.
- **OutputAPI**: the App Maker-facing output API, represented by `E` in `Prototype<P, E>`.

---

## 2. Type System Convention (Prototype Generics)

- A Prototype must include **Props** and **Exposes** generics: `Prototype<P, E>`.
- `P` models InputAPI (props), `E` models OutputAPI (exposes).
- This makes the input/output channels explicit in the App Maker type system.

> v0 does not require runtime reflection of `E`, only type-level modeling.

---

## 3. Definition API: `def.expose` (setup-only)

### 3.1 Signature (v0)

```ts
def.expose<K extends keyof E>(key: K, value: E[K]): void
```

### 3.2 Normative rules

1. `def.expose` **MUST** be called in setup only.
   - Any call outside setup must throw a phase violation error.
2. `key` **MUST** be a string at runtime.
   - Non-string keys (e.g. symbol) must throw an invalid-argument error.
3. Within one component instance, the same `key` **MUST** be exposed only once.
   - Duplicate keys must throw.
4. Expose is a **registration-based binding**:
   - `value` is stored as the expose mapping entry.
   - v0 does not require tracking or synchronizing later changes to `value`.

> Informative note:
> If the host needs change notifications, expose a state handle or an explicit subscribe API.

---

## 4. App Maker Access (adapter responsibility)

Adapters must provide App Maker access to exposes:

- **By key**: retrieve a single expose value
- **All exposes**: retrieve a full `Record<string, ...>` map

### 4.1 Shape requirements (v0)

- The full map must be a `Record<string, unknown>`.
- Keys must match those registered via `def.expose`.

> This contract does not prescribe adapter API names, only behaviors and output shape.

---

## 5. Lifecycle Rules

- After the component instance is **disposed**, the exposes mapping is invalid.
- Any read or invocation on exposes of a disposed instance must throw or fail in a distinguishable way.

> During `unmounted` callbacks (before dispose), exposes may still be treated as available.

---

## 6. Recommended Usage (informative)

Expose is recommended for:

- **Methods** (e.g. `reset()`, `focus()`, `scrollTo()`)
- **State handles** (official syntax, with host-side subscription support)
- **Constants / static configuration** (e.g. `version`, `capabilities`)

Not recommended:

- Exposing a mutable variable without a subscription mechanism

> Reason: the App Maker cannot reliably observe changes; prefer a state handle or explicit subscribe API.

---

## 7. Error Model (v0)

Errors must be raised for:

- `def.expose` called outside setup (phase violation)
- non-string `key`
- duplicate `key` in the same instance
- access after dispose

### 7.1 Recommended error codes

- `EXPOSE_PHASE_VIOLATION`
- `EXPOSE_INVALID_KEY`
- `EXPOSE_DUPLICATE_KEY`
- `EXPOSE_DISPOSED`

---

## 8. v0 Contract Tests (minimum coverage)

Implementations must at least cover:

1. setup-only constraint: calling `def.expose` outside setup throws
2. key rule: non-string key throws
3. duplicate key: same key in one instance throws
4. adapter access:
   - single key retrieval works
   - full retrieval returns a `Record<string, ...>`
5. dispose rule: access after dispose fails

---

## 9. Related Contracts (non-normative)

- props input channel: `internal/contracts/props/*.v0.md`
- state core: `internal/contracts/state/state-v0.md`
- execution-phase guard: `internal/contracts/lifecycle/exec-phase-guard.v0.md`
