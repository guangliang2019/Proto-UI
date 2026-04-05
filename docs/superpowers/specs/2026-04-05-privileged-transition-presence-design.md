# Privileged Transition via `module-presence` — Design Spec

**Date:** 2026-04-05  
**Status:** Draft  
**Goal:** Upgrade `asTransition` from a regular `asHook` into a privileged hook backed by a new system-level module (`@proto.ui/module-presence`), giving it formal control over structural mount/unmount timing across all adapters.

---

## 1. Architecture Overview

We introduce a new privileged module **`@proto.ui/module-presence`**. Its responsibility is _structural presence governance_: when a component's host element should be inserted into the DOM, and when it should actually be removed.

`transition` is a **specialization** of `presence`. `asTransition` keeps its own `closed → entering → entered → leaving → closed` state machine, but delegates structural decisions to `presence` through intent signals.

```
┌─────────────────────────────────────────┐
│  packages/hooks/src/as-transition.ts    │  privileged hook
│  owns the state machine; calls presence │
└─────────────────┬───────────────────────┘
                  │ setIntent('enter' | 'leave')
┌─────────────────▼───────────────────────┐
│  packages/modules/presence              │  new system module
│  maintains presence phase & policy queue│
│  facade → hook  |  port → runtime       │
└─────────────────┬───────────────────────┘
                  │ awaitMount / awaitUnmount
┌─────────────────▼───────────────────────┐
│  runtime / instance/execute/with-host.ts│
│  async interception points at mount &   │
│  unmount paths                          │
└─────────────────┬───────────────────────┘
                  │ PresenceHostBridge cap
┌─────────────────▼───────────────────────┐
│  adapters (react / vue / web-component) │
│  map presence state to host-native      │
│  rendering behavior                     │
└─────────────────────────────────────────┘
```

Key separation of concerns:

- **`module-presence`** — policy engine & phase ledger.
- **`runtime`** — lifecycle orchestration (where to await).
- **`adapters`** — host-native bridge implementation.
- **`asTransition`** — consumer-level state machine that drives intent.

---

## 2. Component Boundaries & Interfaces

### 2.1 Module: `@proto.ui/module-presence`

**Cap Token**

```ts
export const PRESENCE_HOST_BRIDGE_CAP = cap<PresenceHostBridge>('@proto.ui/presence/hostBridge');
```

**Facade** (consumed by privileged hooks)

```ts
export interface PresenceFacade {
  createHandle(policy?: PresencePolicy): PresenceHandle;
}

export interface PresenceHandle {
  /** The implementation is async (it may await bridge callbacks), but the
   *  facade returns `void | Promise<void>` so callers can optionally await
   *  sequencing without forcing every consumer into async syntax. */
  setIntent(intent: 'enter' | 'leave'): void | Promise<void>;
  getPhase(): PresencePhase; // 'absent' | 'mounting' | 'present' | 'unmounting'
  onBeforeMount(cb: () => void | Promise<void>): () => void;
  onBeforeUnmount(cb: () => void | Promise<void>): () => void;
}

export type PresencePhase = 'absent' | 'mounting' | 'present' | 'unmounting';

export interface PresencePolicy {
  /* reserved for future modes, e.g. 'immediate' vs 'deferred' */
}
```

**Port** (consumed by runtime)

```ts
export interface PresencePort {
  /** Returns a Promise only when a handle exists and the phase requires blocking.
   *  Returns `undefined` when no handle was created (to avoid deadlocking
   *  non-transition prototypes) or when blocking is unnecessary. */
  awaitMount(): Promise<void> | undefined;
  awaitUnmount(): Promise<void> | undefined;
}
```

**Implementation notes**

- `PresenceHandle` holds a private intent queue (or current intent + phase).
- On `setIntent('enter')`:
  - if `absent` → `mounting`, schedule `bridge.mount()`, then resolve `awaitMount()`.
  - if `unmounting` → cancel unmount, move to `present`.
  - if `mounting` / `present` → noop.
- On `setIntent('leave')`:
  - if `present` → `unmounting`, hold unmount, do **not** resolve `awaitUnmount()` yet.
  - when `setIntent('leave')` is called again from `unmounting` (the confirmation step) → `absent`, fire `bridge.unmount()`, resolve `awaitUnmount()`.
  - if `mounting` → resolve pending mounts, fire `bridge.unmount()`, go to `absent`.
  - if `absent` → resolve any pending mounts (required for components that start closed so that `awaitMount()` does not deadlock) and stay in `absent`.

### 2.2 Runtime: `packages/runtime/src/instance/execute/with-host.ts`

Two interception points are added to the executor:

**Before mounted phase**

```ts
const presencePort = moduleHub.getPort<PresencePort>('presence');
if (presencePort) await presencePort.awaitMount();
moduleHub.setProtoPhase('mounted');
// ... mounted callbacks
```

**Before unmount teardown** Inside the unmount flow (currently `invokeUnmounted` or equivalent):

```ts
const presencePort = moduleHub.getPort<PresencePort>('presence');
if (presencePort) await presencePort.awaitUnmount();
host.onUnmountBegin?.();
// ... unmounted callbacks
moduleHub.setProtoPhase('unmounted');
inst.dispose();
```

### 2.3 Adapter Bridge: `PresenceHostBridge`

```ts
export interface PresenceHostBridge {
  /** Called when the module decides the host element must exist in the DOM. */
  mount(): void | Promise<void>;
  /** Called when the module decides the host element may finally leave the DOM. */
  unmount(): void | Promise<void>;
}
```

Each adapter provides a framework-native implementation:

- **React** — wrapper component gains a `shouldExist` state. `mount()` sets it `true`. `unmount()` sets it `false` (or returns a Promise if a CSS transition needs to be awaited).
- **Vue** — same pattern via a composable or wrapper component reactive flag.
- **Web Component** — `disconnectedCallback` must **not** trigger teardown directly. Instead, it sets a pending-unmount flag and returns. The actual `hostSession.dispose()` is invoked only inside `bridge.unmount()`. If the element is re-connected while unmount is still pending, `connectedCallback` must treat it as a fresh mount: clear the pending flag, null out the old controller, and re-initialize, rather than reusing a dying controller.

### 2.4 Privileged Hook: `packages/hooks/src/as-transition.ts`

`asTransition` is rewritten as a privileged function (pattern copied from `asOverlay` / `asTrigger`):

```ts
import { getActiveAsHookContext } from '@proto.ui/core/internal';

export function asTransition(/* options */): TransitionHandle {
  const { rt, facades } = getActiveAsHookContext('asTransition');
  rt.ensureSetup('asHook(asTransition)');
  rt.register('asTransition', { privileged: true, mode: 'configurable' });

  const presence = (facades.presence as PresenceFacade | undefined)?.createHandle();
  if (!presence) {
    throw new Error('[AsHook] presence facade unavailable for asTransition.');
  }

  // Build the state machine and wire intents into presence
  // ...
}
```

The state machine logic (4-state FSM) is preserved but now calls:

- `presence.setIntent('enter')` when moving toward `entered`.
- `presence.setIntent('leave')` when moving toward `closed`.
- The first `enter` call triggers `mounting`; the second `leave` confirmation call triggers actual unmount.

---

## 3. Data Flow

### Enter: `closed → entering → entered`

1. Host framework renders component wrapper for the first time.
2. Runtime executor reaches the pre-mounted interception point and calls `presencePort.awaitMount()`.
3. `module-presence` is in `absent`; it **pauses** the mount Promise.
4. `asTransition` initializes, sees `open=true`, transitions to `entering`, calls `presence.setIntent('enter')`.
5. `module-presence` switches to `mounting`, invokes `bridge.mount()`, and resolves the paused mount Promise.
6. Executor proceeds to `mounted` callbacks and first render commit.
7. Host CSS/adapter calls `complete()` after transition ends; `asTransition` moves to `entered`.
8. `asTransition` calls `presence.setIntent('enter')` again (idempotent); phase becomes `present`.

### Leave: `entered → leaving → closed`

1. `open` prop becomes `false`; `asTransition` transitions to `leaving`, calls `presence.setIntent('leave')`.
2. `module-presence` switches to `unmounting`, but **does not** invoke `bridge.unmount()` yet.
3. Host CSS/adapter calls `complete()` after transition ends; `asTransition` moves to `closed`.
4. `asTransition` calls `presence.setIntent('leave')` again (the confirmation step).
5. `module-presence` switches to `absent`, invokes `bridge.unmount()`, and resolves any pending `awaitUnmount()` Promise.
6. If the host framework was already trying to remove the component (e.g. React conditional render), the `awaitUnmount()` that was blocking teardown is now released and the component is truly destroyed.

---

## 4. Edge Cases & Testing Strategy

### 4.1 Rapid Interrupt

- **Scenario:** `open` toggles `true → false → true` within milliseconds.
- **Handling:** When `module-presence` is in `unmounting` and receives `enter`, it cancels the unmount path and transitions directly back to `mounting`. No stale Promise resolution occurs because intent is authoritative.

### 4.2 Adapter Without Bridge (Fallback)

- **Scenario:** An older or minimal adapter does not wire `PRESENCE_HOST_BRIDGE_CAP`.
- **Handling:** `module-presence` uses a no-op bridge (`mount()` and `unmount()` resolve immediately). Behavior degrades gracefully to the current state-only model.

### 4.3 Forced DOM Removal (Web Components)

- **Scenario:** A user script or parent directly removes the custom element from the document before `awaitUnmount()` resolves.
- **Handling:** The WC adapter bridge intercepts `disconnectedCallback`. If an unmount is pending, it defers `hostSession.dispose()` until `bridge.unmount()` is called. If no unmount is pending (forced removal), it performs emergency teardown immediately.

### 4.4 Testing Strategy

| Layer | Target | What to test |
| --- | --- | --- |
| **Module unit** | `packages/modules/presence/test/` | Phase transitions, rapid intent flip, fallback bridge behavior |
| **Runtime integration** | `packages/runtime/test/` | `awaitMount` / `awaitUnmount` correctly block executor flow; timeout fallback |
| **Adapter host** | `packages/adapters/*/test/presence*.test.ts` | React/Vue wrapper conditional rendering; WC `disconnectedCallback` deferral |
| **Hook contract** | `packages/prototypes/base/test/as-transition.test.ts` | Full flow: state machine + presence integration, enter/leave/complete with structural delay |

---

## 5. Files Expected to Change

| Package | Files | Nature |
| --- | --- | --- |
| `packages/modules/presence` | **new** `src/types.ts`, `src/caps.ts`, `src/impl.ts`, `src/create.ts`, `src/index.ts` | New module |
| `packages/runtime` | `src/instance/instance.ts`, `src/instance/execute/with-host.ts` | Register module, add interception points |
| `packages/hooks` | **new** `src/as-transition.ts`, `src/index.ts` | Privileged hook |
| `packages/prototypes/base` | `src/transition/as-transition.ts`, `src/transition/index.ts` | Replace local hook with import from `@proto.ui/hooks` |
| `packages/adapters/base` | `src/wiring/caps-builder.ts` | Add `usePresence()` method |
| `packages/adapters/react` | `src/runtime/modules.ts`, `src/adapt.ts`, test files | Wire bridge, implement wrapper behavior |
| `packages/adapters/vue` | `src/runtime/modules.ts`, `src/adapt.ts`, test files | Wire bridge, implement wrapper behavior |
| `packages/adapters/web-component` | `src/runtime/modules.ts`, `src/adapt.ts`, test files | Wire bridge, defer `disconnectedCallback` |
| `docs` | EN & ZH `transition.mdx`, `transition.v0.md` | Update to reflect privileged hook + presence abstraction |

---

## 6. Migration Path for This PR

1. **Land this design** as committed spec (`docs/superpowers/specs/2026-04-05-privileged-transition-presence-design.md`).
2. **Implementation plan** produced via `writing-plans` skill.
3. **Execute plan**:
   - build `module-presence`
   - wire runtime
   - migrate `asTransition` to privileged hook
   - update adapters one-by-one (WC first, then Vue, then React)
   - add tests and docs
   - push commits to existing PR branch (`feat/transition`).
