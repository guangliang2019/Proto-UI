# Props Contract v0

This directory defines the **v0 behavioral contract** for the Props system in Proto UI.

The contract describes **what must be true at runtime**, not how the system is implemented. All guarantees in this directory are considered **frozen for v0** and are covered by corresponding contract tests.

---

## Scope

Props v0 contract covers:

- Declaration merge rules (`define`)
- Raw → resolved value resolution
- Empty / invalid handling and fallback semantics
- Watch behavior (resolved-level and raw-level)

Props v0 does **not** cover:

- Cross-ecosystem encoding of props (e.g. how arrays/objects are passed via HTML attributes)
- A full type IR or schema language
- Serialization formats or transport guarantees

---

## Versioning Policy

- v0 contracts are **behaviorally frozen**
- New features may be added in v1+, but **v0 behavior must remain reproducible**
- Contract tests are the source of truth for behavioral guarantees

---

## Glossary

### Input State (per prop key)

- **missing**  
  The key is not present on the raw props object  
  (`Object.prototype.hasOwnProperty.call(raw, key) === false`)

- **provided-empty**  
  The key is present, but the value is `null` or `undefined`

- **provided-non-empty**  
  The key is present and the value is neither `null` nor `undefined`

- **invalid**  
  A provided-non-empty value that fails validation (kind / enum / range / validator)

---

### Canonical Empty

- **`null` is the canonical empty value** in resolved props
- `undefined` is never present in resolved snapshots

---

### EmptyBehavior

`EmptyBehavior` controls how empty or invalid input is treated:

- `accept`  
  Accept empty input and resolve to `null`

- `fallback` (default)  
  Resolve via fallback chain

- `error`  
  Require a valid, non-empty fallback or throw

---

### Fallback Chain (ordered)

1. Previous valid value (`prevValid`)
2. Defaults stack (`setDefaults`, latest-first)
3. Declaration default (`decl.default`)
4. Canonical empty (`null`) — only if allowed

---

## Type Portability Note (v0)

Props v0 intentionally uses **weak, portable type semantics**.

### Primitive Types (v0-stable)

- `string` (no distinction between char/string)
- `number` (no distinction between integer/float)
- `boolean`
- `null` (canonical empty)

### Complex Types

All non-primitive values (e.g. arrays, objects, functions) are treated as **complex types**.

In v0:

- Complex values are allowed in props
- Validation for complex types is minimal
- No cross-ecosystem encoding or IR is defined
- Adapters may interpret complex values differently

This avoids coupling Props v0 to JavaScript/TypeScript-specific type systems.

---

## Contract Documents

| Area               | Document               | Test                                 |
| ------------------ | ---------------------- | ------------------------------------ |
| Declaration merge  | define-merge.v0.md     | define-merge.v0.contract.test.ts     |
| Resolve & fallback | resolve-fallback.v0.md | resolve-fallback.v0.contract.test.ts |
| Resolved watch     | watch-resolved.v0.md   | watch-resolved.v0.contract.test.ts   |
| Raw watch          | watch-raw.v0.md        | watch-raw.v0.contract.test.ts        |

Each contract section uses IDs of the form `PROP-V0-xxxx`.
