# Expose Classification & API (v0)

> Status: Draft – v0
>
> v0 classifies expose semantics so adapters can map outputs consistently.
> This does not change expose's registration nature; it adds semantic categories and entry points.

---

## 1. Categories

Expose v0 defines:

1. **event**: outward notifications (Component → App Maker)
2. **state**: external read-only state handles (expose-state)
3. **value**: read-only constants/config
4. **method**: imperative APIs

---

## 2. API Shape (setup-only)

### 2.1 Base form

```ts
def.expose<K extends keyof E>(key: K, value: E[K]): void
```

### 2.2 Classified form (new)

```ts
def.expose.event<K extends string>(key: K, spec: ExposeEventSpec): void

def.expose.state<K extends string>(key: K, handle: InternalStateHandleView): void

def.expose.value<K extends string, V>(key: K, value: V): void

def.expose.method<K extends string, F extends Function>(key: K, fn: F): void
```

> These APIs only add semantic meaning and adapter mapping, while keeping setup-only and lifecycle rules.

---

## 3. Semantic Rules

- `event`: declares outward event channel, bound to event module (see expose-event)
- `state`: equivalent to `def.expose(key, handle)` with expose-state semantics
- `value`: equivalent to `def.expose(key, value)` with read-only semantics
- `method`: equivalent to `def.expose(key, fn)` with imperative semantics

---

## 4. Adapter Mapping (overview)

- React:
  - event → props callback
  - method → ref/instance method
  - state → external state handle
  - value → props or static expose map

- Vue:
  - event → emits
  - method → `expose()`
  - state/value → expose map

- WebComponent:
  - event → CustomEvent
  - method/state/value → instance properties/methods

> Adapter contracts should define concrete naming and mapping rules.

---

## 5. Error Model

- all classified APIs inherit `def.expose` errors
- `event` classification must error if event module binding is unavailable (see expose-event)

