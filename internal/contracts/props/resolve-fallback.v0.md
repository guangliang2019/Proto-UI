# Resolve & Fallback Contract (v0)

This document defines how raw props are resolved into runtime-visible props, and how empty/invalid values are handled.

---

## 1. Input Classification

For each declared key:

- **missing**: key not present in raw
- **provided-empty**: key present and value is `null` or `undefined`
- **provided-non-empty**: key present and value is not `null/undefined`
- **invalid**: provided-non-empty but fails validation (`type/enum/range/validator`)

---

## 2. Public Runtime APIs

- `get()`:
  - returns resolved snapshot
  - declared keys only
  - never contains `undefined`
  - shallowly frozen

- `getRaw()`:
  - returns raw snapshot
  - may include undeclared keys
  - may include `undefined`

- `isProvided(key)`:
  - true if key exists as own property in raw

---

## 3. Resolved Output Invariants

- resolved contains only declared keys
- resolved never contains `undefined`
- all declared keys are always present
- `null` is the only canonical empty

---

## 4. EmptyBehavior

### 4.1 empty=accept
- applies only to provided-empty
- provided-empty → resolved `null`
- missing still uses fallback
- invalid non-empty uses fallback/error

### 4.2 empty=fallback (default)
- missing / provided-empty / invalid → fallback chain

### 4.3 empty=error
- missing / provided-empty / invalid → must find a **non-empty valid fallback**, otherwise throw

---

## 5. Fallback Chain (order)

1. prevValid (last non-empty valid value)
2. setDefaults (latest-first)
3. decl.default
4. null (only if empty != error)

---

## 6. prevValid Rules

- only stores **non-empty valid values**
- `null` is never written to prevValid
- invalid values do not update prevValid

---

## 7. Validation Semantics (v0)

- minimal type checks:
  - boolean → `typeof v === "boolean"`
  - string → `typeof v === "string"`
  - number → `typeof v === "number" && !Number.isNaN(v)`
  - object → `typeof v === "object"`
  - any → always valid

- enum/range/validator failure → invalid

---

## 8. JSON-like Constraints (supplement)

- props are semantically JSON-like portable data
- `undefined` is not allowed as a semantic value; runtime `undefined` must be normalized to `null`
- non JSON-like values may appear but are not guaranteed to be portable across adapters

