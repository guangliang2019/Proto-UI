# Define & Merge Contract (v0)

This document defines the v0 contract for how prop declarations are registered and merged via `define()`.
It prioritizes **traceability** and **evolution safety**:
- breaking changes must error immediately
- widening changes are allowed but should be traceable (warning)

---

## 1. Scope & Terms

- **Base**: declarations already registered
- **Incoming**: declarations passed to the current `define()`
- **Diagnostic**:
  - error: `define()` must throw and **no changes apply**
  - warning: merge succeeds but is recorded

---

## 2. Minimal Shape Validation (v0)

For each incoming prop:
- `type` must be one of `any | boolean | string | number | object`
- if `empty` is provided, it must be `accept | fallback | error`
- if `range` is provided, `min/max` must be numbers

Any violation is an **error**.

---

## 3. Merge Rules (same key)

### 3.1 type
- Base and Incoming `type` must be identical
- mismatch → **error**

### 3.2 empty
Strictness order (loose → strict):

```
accept < fallback < error
```

- Incoming stricter → **error**
- Incoming looser → **warning**, but **keep the original stricter behavior**
- Incoming omit → no change

### 3.3 enum
- Incoming subset of Base → **error**
- Incoming superset of Base → **warning**
- equal → ok
- Base missing + Incoming present → ok
- Incoming omit → keep Base

> v0 enum comparison uses `String(...)` membership.

### 3.4 range
- Incoming narrower → **error**
- Incoming wider → **warning**
- Base missing + Incoming present → ok
- Incoming omit → keep Base

### 3.5 validator
- Base missing + Incoming added → ok
- replacement/removal → **error**

### 3.6 default
- first-time default allowed
- changing default → **warning**, **keep previous default**

---

## 4. Merge Result & Atomicity

- merge is atomic: any error → entire `define()` is rejected
- on success:
  - `type` remains Base
  - `empty/enum/range/validator/default` follow rules above
  - other fields merged via object spread

---

## 5. Inheritance Notes

This document inherits the structure of the previous v0 contract, with updates:
- looser `empty` does not relax behavior
- validator additions are allowed
- default changes do not take effect

