# internal/contracts/context/with-tree.v0.impl-notes.md

> Informal notes. Not normative; the contract is `with-tree.v0.md`.

---

## 1) Where APIs should live (phase separation)

Given the global rule “runtime-only callbacks’ first arg is `run`”:

- setup-only context APIs should live under `def.context`

  - `def.context.provide(key, value)`
  - `def.context.subscribe(key)`
  - `def.context.trySubscribe(key)`

- runtime-only reads should live under `run.context`

  - `run.context.read(key)`
  - `run.context.tryRead(key)`

This makes phase-guarding straightforward.

---

## 2) Value domain: forbid undefined/null, reserve null for optional absence

Implementation should reject illegal provided values early:

- `provide(key, value)` must reject:

  - `value === undefined`
  - `value === null`

Optional absence is represented by `tryRead(...) === null`:

- If provider is absent at runtime, `tryRead` returns null.
- If provider is disconnected due to tree changes, `tryRead` returns null.

Required reads:

- `read(...)` throws when disconnected.

---

## 3) Provider resolution

A simple approach:

- Each instance has a pointer to its parent instance in the logical tree.
- To resolve (instance, key), walk up parent pointers until a provider record is found.

If performance becomes an issue:

- Cache resolved provider per (instance, key) with invalidation on tree mutations.
- v0 can start with a straightforward walk if trees are small.

---

## 4) Subscription intent tracking

During setup:

- `subscribe(key)` records “required subscription intent” for the key.
- `trySubscribe(key)` records “optional subscription intent” for the key.

Because v0 assumes tree assembly precedes init:

- required `subscribe` can validate provider availability immediately and throw early.

---

## 5) Runtime read behavior

At runtime:

- `read(key)`:

  - checks required intent exists
  - checks currently connected provider exists
  - returns transformed value

- `tryRead(key)`:

  - checks optional intent exists
  - returns transformed value if connected
  - else returns null

No connection-change notifications in v0.

---

## 6) Provide rules

- Track provided keys in a per-instance map:

  - `provided: Map<ContextKey<any>, any>`

- Duplicate provide on the same instance should throw immediately.

---

## 7) Readonly-state transformation

Perform transformation at read-time (simplest) or at provide-time (fast reads).

Practical v0 approach:

- On provide:

  - validate value is not undefined/null
  - if plain object/array, validate (or deep-freeze optionally)

- On read:

  - return a deep-copied/transformed structure where embedded state handles are replaced by readonly wrappers

Traversal rules:

- recurse on arrays
- recurse on plain objects (Object.getPrototypeOf(x) === Object.prototype)
- leave functions as-is (opaque runtime references)
- leave class instances as-is (discouraged; not portable)

Readonly wrapper:

- provide `get()`
- omit any write/subscribe methods

---

## 8) Tree changes

Represent “disconnected” as:

- resolved provider becomes null
- or parent pointer changes invalidate caches

Since v0 does not notify, correctness is enforced via `read`/`tryRead` rules only.

---

## 9) Error codes

Use a lightweight error helper that attaches `error.code`:

- CONTEXT_PHASE_VIOLATION
- CONTEXT_PROVIDER_MISSING
- CONTEXT_SUBSCRIPTION_REQUIRED
- CONTEXT_DUPLICATE_PROVIDE
- CONTEXT_DISCONNECTED
