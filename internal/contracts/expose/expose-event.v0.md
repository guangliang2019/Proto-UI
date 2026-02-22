# Expose Event Contract (v0)

> Status: Draft – v0
>
> Expose Event binds outward event semantics to the event module, providing a stable event API for adapter mapping.

---

## 0. Goals

- define outward event semantics (Component → App Maker)
- bind to event module registration + emit
- provide a unified adapter mapping entry

---

## 1. Definition API (setup-only)

```ts
def.expose.event(key, spec);
```

### 1.1 ExposeEventSpec

```ts
type ExposeEventSpec = {
  // payload semantic hint (v0 minimal)
  payload?: 'void' | 'any' | 'json';
  // reserved for future use (v0 no behavior)
  options?: Record<string, unknown>;
};
```

---

## 2. Binding Rules (event module)

- `def.expose.event` must register with the event module's outward event channel
- outward events live in a dedicated namespace to avoid conflicts with native events
- outward events must be fired via the event module emit capability

### 2.1 Emit API (v0)

```ts
run.event.emit(key: string, payload?: any, options?: Record<string, unknown>): void
```

- `key` must be a registered expose.event key
- unregistered key → error
- `options` is reserved in v0 and has no behavior

---

## 3. Adapter Mapping

- React:
  - expose.event → props callback (e.g. `onXxx`)
  - emit → invoke props callback
- Vue:
  - expose.event → emits declaration
  - emit → `ctx.emit`
- WebComponent:
  - expose.event → CustomEvent
  - emit → `dispatchEvent`

---

## 4. Runtime Semantics

- emit is valid only while instance is alive
- after dispose, emit must fail or be distinguishable
- payload should follow JSON-like portability (same as props)

---

## 5. Error Model

Must error for:

- `def.expose.event` outside setup
- non-string key
- duplicate event key
- emit unregistered key
- emit after dispose

Suggested error codes:

- `EXPOSE_EVENT_PHASE_VIOLATION`
- `EXPOSE_EVENT_INVALID_KEY`
- `EXPOSE_EVENT_DUPLICATE_KEY`
- `EXPOSE_EVENT_UNREGISTERED`
- `EXPOSE_EVENT_DISPOSED`

---

## 6. Related Contracts

- expose core: `internal/contracts/expose/expose.v0.md`
- event core: `internal/contracts/event/*.v0.md`
