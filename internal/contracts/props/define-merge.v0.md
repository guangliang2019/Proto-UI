# Define & Merge Contract (v0)

This document defines the **v0 behavioral contract** for how prop declarations
are registered and merged via `define()` in the Props system.

The contract focuses on **evolution safety and traceability**, not prohibition.
Changes are allowed where they do not create ambiguous or silent breakage.

---

## PROP-V0-1000 Scope & Terms

### Declaration (Decl)

A prop declaration is a `PropDecl` entry inside a `PropsDeclMap`.

### Base vs Incoming

- **Base**: declarations already registered in the PropsManager
- **Incoming**: declarations passed to a subsequent `define()` call

### Diagnostics

Each merge may produce diagnostics:

- **error**  
  The merge is invalid. `define()` must throw and **no changes are applied**.

- **warning**  
  The merge succeeds but records a diagnostic for traceability.

---

## PROP-V0-1100 Kind Compatibility

For a key that exists in both base and incoming declarations:

- `kind` **must be identical**
- Any mismatch produces **error**
- `define()` must throw

This rule is absolute and has no warnings.

---

## PROP-V0-1200 EmptyBehavior Merge

`empty` controls how empty or invalid input is treated at resolution time.

### Defaults

- If `empty` is omitted, it is treated as `"fallback"` for merge comparison.

### Change Detection Rule

- EmptyBehavior comparison is performed **only if incoming explicitly provides the `empty` field**.
- If incoming omits `empty`, it does **not** affect the base declaration and produces no diagnostic.

### Strictness Ordering (v0)

From loosest to strictest:

```text
accept < fallback < error
```

### Rules

If incoming explicitly sets `empty`:

- If incoming is **stricter** than base → **error**
- If incoming is **looser** than base → **warning**
- If equal → no diagnostic

Merge result uses the incoming value when equal or looser.

---

## PROP-V0-1300 Enum Merge

`enum` is a schema constraint that restricts allowed values.

### Rules

- If both base and incoming define `enum`:
  - Incoming **subset** of base → **error**
  - Incoming **superset** of base → **warning**
  - Equal → no diagnostic
- If base has no `enum` and incoming provides one:
  - Allowed
  - No diagnostic
- If incoming omits `enum`:
  - Base `enum` is preserved

> v0 enum comparison uses stringified membership semantics.

Merge result selects:

```ts
incoming.enum ?? base.enum;
```

---

## PROP-V0-1400 Range Merge

`range` is a numeric schema constraint.

### Rules

- If both base and incoming define `range`:
  - Incoming **narrower** than base → **error**
  - Incoming **wider** than base → **warning**
  - Equal → no diagnostic
- If base has no `range` and incoming provides one:
  - Allowed
  - No diagnostic
- If incoming omits `range`:
  - Base `range` is preserved

Merge result selects:

```ts
incoming.range ?? base.range;
```

---

## PROP-V0-1500 Validator Merge

`validator` is treated as a potentially stricter and non-portable constraint.

### Rules

- If either base or incoming defines `validator`:
  - Incoming validator **must be the same function reference** as base
  - Any addition, removal, or replacement → **error**

Merge result keeps the original validator reference.

---

## PROP-V0-1600 Default Merge

Declaration-level `default` values are allowed but discouraged.

### Rules

- If both base and incoming explicitly define `default`
  and values are not strictly equal (`!==`) → **warning**
- Otherwise no diagnostic

Merge result prefers incoming fields.

---

## PROP-V0-1700 Deterministic Merge Result

For a key present in both base and incoming, if merge succeeds:

- `kind` remains unchanged (base value)
- `empty`:
  - Changes only if incoming explicitly defines it
  - May become looser (with warning)
  - Never becomes stricter
- `enum` / `range`:
  - May be introduced
  - May be widened (with warning)
  - Never narrowed
- `validator`:
  - Must be identical
- All other fields:
  - Merged via object spread semantics

---

## PROP-V0-1800 Failure Atomicity

If **any key** in a `define()` call produces an **error**:

- `define()` must throw
- No partial merge is applied
- All previous declarations remain effective

This guarantees deterministic and recoverable behavior.

---

## PROP-V0-1900 Traceability Principle (Non-Normative)

Props v0 prioritizes **traceability over prohibition**:

- Breaking or ambiguous changes throw immediately
- Boundary-widening changes are allowed but surfaced via warnings
- Pure additions (new keys or new constraints on previously unconstrained keys)
  are allowed without noise

This enables gradual evolution while keeping debugging costs low.
