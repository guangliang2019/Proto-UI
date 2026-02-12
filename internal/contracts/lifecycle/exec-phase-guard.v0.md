# exec-phase-guard.v0.md

> Status: Draft – implementation-aligned (v0)
> This contract specifies Proto UI’s **execution phase guard** as provided by `SystemCaps`.
> It is a shared foundation used by runtime + modules to enforce “setup vs runtime vs disposed”.

---

## 0. Scope & Non-goals

### 0.1 Scope (v0)

This contract defines:

- The meanings of **GuardDomain** and **ProtoPhase**
- The minimum SystemCaps surface
- Enforcement rules for:
  - setup-only operations
  - runtime-only operations
  - disposed-only violations
- Error expectations (diagnostics level, not strict types)

### 0.2 Non-goals (v0)

- No requirement for stable error classes/codes (recommended in later versions).
- No requirement to expose `PhaseLike` (“render/callback/unknown”) to module authors.
- No requirement to model every lifecycle moment; only the guard semantics.

---

## 1. Terminology

- **GuardDomain**: coarse execution domain used for module API gating.

  - `"setup"`: prototype is executing `proto.setup(def)` (def-only world).
  - `"runtime"`: any execution after setup (callbacks / render / host-driven paths).

- **ProtoPhase**: logical lifecycle checkpoint (semantic timeline), controlled by runtime.

  - v0 set is minimal and comes from `@proto-ui/core`:
    - `"setup"`
    - `"created"`
    - `"mounted"`
    - `"updated"`
    - `"unmounted"`
  - (Exact set is defined by core; SystemCaps must reflect whatever core defines.)

- **disposed**: module hub has been disposed; caps are invalid; handles must throw.

---

## 2. SystemCaps surface (v0)

`SystemCaps` must provide:

- `domain(): GuardDomain`
- `protoPhase(): ProtoPhase`
- `isDisposed(): boolean`

- `ensureSetup(op: string): void`
- `ensureRuntime(op: string): void`
- `ensureNotDisposed(op: string): void`

`WithSystemCaps` is the caps injection shape:

```ts
type WithSystemCaps = { __sys: SystemCaps };
```

---

## 3. Semantics

### 3.1 Domain semantics (v0)

- `domain()` MUST return `"setup"` **iff** the runtime’s current execution is inside `proto.setup(def)`.
- Otherwise it MUST return `"runtime"`.

> Implementation note: runtime may have finer-grained internal phases (render/callback/unknown),
> but domain is intentionally binary for v0 modules.

### 3.2 ProtoPhase semantics (v0)

- `protoPhase()` MUST reflect the current logical lifecycle checkpoint as set by runtime.
- Runtime is responsible for updating protoPhase at the correct time.
- Modules may read protoPhase for diagnostics or conditional behavior, but MUST NOT be required
  to function correctly based on protoPhase granularity.

### 3.3 Disposed semantics (v0)

- `isDisposed()` MUST become true after runtime disposes the module hub.
- After disposed, all module facades / handles that rely on SystemCaps MUST treat any operation as invalid.

---

## 4. Guard enforcement rules

### 4.1 ensureNotDisposed(op)

- If `isDisposed() === true`, `ensureNotDisposed(op)` MUST throw.
- Otherwise MUST be a no-op.

### 4.2 ensureSetup(op)

- MUST call `ensureNotDisposed(op)` first (or equivalent behavior).
- If `domain() !== "setup"`, MUST throw.
- Otherwise no-op.

### 4.3 ensureRuntime(op)

- MUST call `ensureNotDisposed(op)` first (or equivalent behavior).
- If `domain() !== "runtime"`, MUST throw.
- Otherwise no-op.

---

## 5. Error model (v0)

### 5.1 Minimum diagnostics

Errors thrown by SystemCaps guards MUST include (string-level is sufficient):

- prototypeName (or enough information to identify the component instance)
- `op` (operation label)
- expected domain (`setup` vs `runtime`) for domain violations
- actual domain (or a proxy like “setup” when expected runtime)
- protoPhase (recommended; may be included in message)

### 5.2 Categories (non-normative)

Recommended categories (not required in v0):

- `EXEC_PHASE_VIOLATION`
- `EXEC_DISPOSED_VIOLATION`

---

## 6. Injection requirements (runtime/module-base)

### 6.1 Injection

- Runtime MUST inject a single shared `__sys` object into each module’s CapsVault **before** module creation.
- Each module MUST be able to retrieve it via CapsVaultView access.

### 6.2 Stability

- The `__sys` reference MUST remain stable for the lifetime of the module hub.
- After dispose, caps may be reset/invalidated, but `__sys.isDisposed()` must still behave consistently
  while any previously returned handle attempts to operate.

---

## 7. Contract tests (v0 minimum coverage)

Implementations must be validated for:

1. Domain gating:

   - calling `ensureRuntime` in setup throws
   - calling `ensureSetup` in runtime throws

2. Dispose gating:

   - after dispose, `ensureNotDisposed/ensureSetup/ensureRuntime` all throw

3. Diagnostics:

   - thrown errors contain `op` and identifying info (prototypeName recommended)
