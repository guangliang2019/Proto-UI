# internal/contracts/context/with-tree.v0.md

> Status: Draft – implementation-ready (contract-first) This contract specifies Proto UI **context**: tree-based provider resolution, setup-only subscription intent, runtime reads and updates, and strict value constraints for v0 portability.

---

## 0. Scope & Non-goals

### 0.1 Scope

Context provides:

- A **tree-based** communication channel between components (provider → consumer).
- Setup-only **subscription intent** with runtime **reads** and **updates**.
- Deterministic provider resolution: **nearest provider wins**.
- v0 portability constraints: context values are JSON-serializable **objects**.

### 0.2 Non-goals

- Bidirectional/peer communication beyond context (e.g. other channels) is out of scope for v0.
- Connection-change notifications (connected/disconnected callbacks) are out of scope for v0.
- Compiler-stage portability and AST-based extraction are out of scope for v0.
- Host-specific capabilities (e.g. `def.host`) are out of scope for context.

---

## 1. Terminology

- **ContextKey<T>**: a unique token (symbol-like) identifying a context channel.
- **Provider**: a component instance that provides a value for a ContextKey.
- **Consumer**: a component instance that subscribes/reads/updates a ContextKey.
- **Logical tree**: the runtime component tree (for WC it matches DOM tree).
- **Nearest provider wins**: the consumer binds to the closest ancestor provider for the key.

---

## 2. ContextKey

### 2.1 Identity

- ContextKey identity is unique and comparable by reference (symbol-like).
- ContextKeys may be shared via JS modules.

### 2.2 Creation (core-owned)

Core MUST provide a ContextKey factory, e.g.:

- `createContextKey<T>(debugName: string): ContextKey<T>`

`debugName`:

- MUST be present for diagnostics (error messages, debug logs).
- does not affect identity.

---

## 3. Provider resolution

- Provider resolution MUST be based on the logical tree.
- For a given (consumer instance, key), the bound provider is the **nearest ancestor provider** of that key.
- Different component instances may provide the same key simultaneously; binding is per consumer and depends on tree position.

---

## 4. Setup-only subscription intent

Context subscription APIs are setup-only:

- `subscribe(key, onChange?)` (required)
- `trySubscribe(key, onChange?)` (optional)

> Subscriptions declare intent and register an optional callback. The callback fires during runtime updates.

### 4.1 subscribe (required)

- `subscribe(key, onChange?)` MUST be callable only during setup.
- If no provider is available for that key at setup time, `subscribe` MUST throw.

Assumption in v0:

- Logical tree assembly occurs before context system initialization, so provider availability is known at setup.

### 4.2 trySubscribe (optional)

- `trySubscribe(key, onChange?)` MUST be callable only during setup.
- If no provider is available at setup time, `trySubscribe` MUST NOT throw.

---

## 5. Runtime-only reads

Read APIs are runtime-only:

- `read(key)` (required subscription)
- `tryRead(key)` (optional subscription)

### 5.1 read (required)

- `read(key)` MUST be callable only during runtime callback phase.
- `read(key)` MUST require prior `subscribe(key, onChange?)` in setup.
- If the subscription is disconnected at runtime (provider removed / tree changed), `read` MUST throw.

### 5.2 tryRead (optional)

- `tryRead(key)` MUST be callable only during runtime callback phase.
- `tryRead(key)` MUST require prior `trySubscribe(key, onChange?)` in setup.
- If the subscription is disconnected or provider is absent, `tryRead` MUST return `null`.

---

## 6. Provide & update

### 6.1 Provide API phase

- `provide(key, defaultValue)` MUST be setup-only.

### 6.2 Update function (provider-side)

- `provide` MUST return an `update` function for the provider to use.
- `update` is runtime-only. Any setup-time invocation MUST throw (phase guard).
- `update(next)` publishes a new context value for the key.
- `update` MAY accept an updater function: `update(prev => next)`.

### 6.3 Update function (consumer-side)

- `run.context.update(key, next)` is runtime-only.
- A consumer MUST have previously subscribed to the key (via `subscribe` or `trySubscribe`) to call `update`.
- The `run.context.update` signature mirrors the provider-side `update` (including updater function overload).

### 6.4 tryUpdate (optional)

- `run.context.tryUpdate(key, next)` is runtime-only and MUST require prior `trySubscribe`.
- If the context is unavailable (no provider or disconnected), `tryUpdate` MUST return `false` and perform no update.
- If the update succeeds, `tryUpdate` MUST return `true`.

### 6.5 Duplicate provide per instance

- A component instance MUST NOT provide the same key more than once.
- Duplicate provide MUST throw.

---

## 7. Value constraints & portability (v0)

### 7.1 Value domain

- Context values MUST be plain objects and JSON-serializable.
- `undefined` is illegal in Proto UI prototypes.
- The following are forbidden in context values:
  - functions
  - DOM/host references
  - PrototypeRef
  - State
  - class instances
  - circular references
  - Map/Set/Date/RegExp or other non-JSON structures

### 7.2 Null semantics

- A top-level value of `null` means **context unavailable** (no provider or disconnected).
- `null` is allowed inside object fields.
- Prototype syntax forbids `undefined`, so empty values use `null`.
- Component authors MUST NOT set a context value to `null`.

### 7.3 Portability scope

- v0 only promises **Adapter-stage** portability.
- Compiler-stage portability and AST-based extraction are out of scope for v0.

---

## 8. Subscription callbacks & notifications

- `subscribe/trySubscribe` callbacks fire during runtime when context updates.
- Callback signature: `(run, next, prev)`.
- `next` and `prev` are JSON objects, or `null` if context is unavailable.
- Update notifications are synchronous and MUST NOT be merged: every update enqueues exactly one notification.

> v0 does not mandate async scheduling. Ordering MUST be deterministic.

---

## 9. Tree changes & re-binding

- Provider/consumer bindings MAY change if the logical tree changes.
- v0 provides no explicit notification callbacks for re-binding.
- Correctness is enforced by `read/tryRead` and subscription callback semantics.

---

## 10. Error model

Implementations MUST throw for:

- Phase violations (setup-only/runtime-only misuse)
- Missing provider for required `subscribe`
- Missing prior subscription intent (`read` without `subscribe`, `tryRead` without `trySubscribe`, `update` without subscribe)
- Duplicate provide for the same key on the same instance
- Disconnected required read
- Invalid provided values

### 10.1 Error typing (minimum)

Errors MUST be distinguishable by type or code (e.g. `error.code`).

Recommended codes (v0):

- `CONTEXT_PHASE_VIOLATION`
- `CONTEXT_PROVIDER_MISSING`
- `CONTEXT_SUBSCRIPTION_REQUIRED`
- `CONTEXT_DUPLICATE_PROVIDE`
- `CONTEXT_DISCONNECTED`
- `CONTEXT_VALUE_INVALID`
