# Runtime Lifecycle with Host (v0)

This document defines the **runtime lifecycle contract** for Proto UI when running with a host (adapter). It describes what prototype authors may rely on, and what host implementations (WC/React/Vue/etc.) may choose.

> Scope: v0, host-based execution (`executeWithHost`). Non-goals: describing DOM patching strategy, performance guarantees, or framework-specific scheduling details.

---

## Terms

- **Runtime**: the Proto UI executor that calls `setup`, `render`, lifecycle callbacks, and asks the host to commit.
- **Host**: the adapter/platform layer that implements `RuntimeHost` (commit + schedule + props snapshot).
- **Commit**: the moment the host applies the rendered `TemplateChildren` to the platform view.
- **Instance**: one "created" runtime instance produced by one `proto.setup(def)` call inside the host element/component.

---

## Contract: Lifecycle Semantics (cross-host)

The following semantics are the **minimum guarantees** prototype code may depend on. Hosts are allowed to provide stronger guarantees.

### created

- `created` callbacks run **once** per instance.
- They run **after** `setup()` completed and **before** the first commit.
- Prototype authors may:
  - read props/context/state (as provided by the host)
  - register subscriptions/listeners via the provided APIs
  - prepare side effects that do not require committed view access

**Not guaranteed**:

- Any platform view nodes exist at `created` time (even if some hosts can already allocate them).

### mounted

- `mounted` callbacks run **once** per instance, **after the first commit**.
- The exact time is **host-controlled** via `host.schedule`.
- `mounted` is intended to mean: _the view and the host’s data model are connected at a time the host considers safe._

Hosts may schedule mounted:

- immediately,
- in a microtask,
- in a macrotask,
- in a framework "next tick",
- or other scheduling points.

Prototype code must not assume a specific scheduling primitive.

### update intent

Proto UI exposes an `update()` intent through `RunHandle.update()`.

**Contract**:

- `update()` expresses _intent to update_.
- The host may batch/coalesce/schedule commits.
- Prototype code must not rely on synchronous view changes immediately after calling `update()`.

This mirrors common host component models (e.g. a framework state update does not necessarily commit synchronously).

### updated

- `updated` callbacks run **after** a host commit that corresponds to an update cycle.
- The host/runtime may choose to coalesce multiple update intents into fewer commits.
- If an update intent is coalesced into a single commit, `updated` runs once for that commit.

**v0 note**: `updated` exists as a lifecycle hook, but not all adapters must expose a public API that triggers it frequently. It is primarily for internal correctness and for future patch/update strategies.

### unmounted

- `unmounted` callbacks run when the host determines the instance is disconnected / disposed.
- `unmounted` is for cleaning up side effects established during the instance lifetime.
- There is no separate `destroy` callback in v0. Prototype authors should treat:
  - **mounted** as “establish side effects”
  - **unmounted** as “dispose side effects”

**Mount/unmount frequency**:

- The contract does not require that an instance is mounted/unmounted strictly once in all host environments.
- v0 guidance: write effects to be idempotent and safe to re-establish/cleanup.

---

## Ordering Constraints (cross-host)

These ordering constraints are guaranteed:

1. `setup` happens before any lifecycle callbacks.
2. `created` happens before the first `commit`.
3. The first `commit` happens before `mounted`.
4. For an update cycle: `commit(update)` happens before `updated`.
5. `unmounted` happens after the host disconnects/disposes the instance.

---

## Implementation Note: v0 executeWithHost behavior

This section documents the current v0 implementation of `executeWithHost`. It is **not** the cross-host contract.

Current behavior (v0):

- Raw props are applied into a props manager **before** `created`.
- `created` runs once before the initial commit.
- Initial render is computed and committed immediately via `host.commit(children)`.
- `mounted` is scheduled via `host.schedule(() => ...)`.
- `controller.update()` triggers a synchronous render + `host.commit(...)` in the current runtime implementation, then runs `updated` callbacks.

Adapters may still choose to interpret `RunHandle.update()` differently (e.g. to forward intent into a framework scheduler), as long as the ordering constraints hold.

---

## Host Profiles (v0)

Host profiles are _adapter-specific decisions_ built on top of this contract.

- Web Component Adapter:
  - may commit synchronously on `update()` (stronger than contract)
  - chooses a specific scheduling primitive for `mounted` (microtask or macrotask)
  - implements Light DOM slot projection (see `adapter-web-component/slot-light-dom.v0.md`)

- React/Vue adapters (future):
  - may treat `update()` purely as an intent and schedule commit via framework update cycles
  - still must satisfy ordering constraints (created-before-first-commit, mounted-after-first-commit, etc.)

---

## Appendix: What to test

To keep layering clean:

- Runtime contract tests should use a mock host to validate **ordering constraints** and **callback invocation rules**.
- Adapter profile tests (WC/React/Vue) should validate platform-specific scheduling and behavior choices.
