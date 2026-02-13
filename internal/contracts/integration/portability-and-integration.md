# Portability, Integration, and the Role of Functions

This document explains **how Proto UI thinks about integration, portability, and functions**. It is not a contract. Its purpose is to clarify design intent and to prevent incorrect assumptions when writing prototypes, adapters, or future compilers.

---

## 1. Integration Is About Composition, Not Semantics

The `integration` directory exists to verify that **existing semantics compose correctly** across modules.

Integration contract tests answer questions like:

- Can props drive style through rule?
- Can state changes be reflected in style?
- Can context-provided values influence behavior?

They do **not** introduce new semantics.

All semantics must already be defined in:

- source contracts (props, state, context)
- orchestration contracts (rule)
- realization contracts (adapter, feedback)

Integration tests only verify that these pieces work together as specified.

This distinction is intentional: **integration validates composition, not meaning**.

---

## 2. Two Execution Routes: Adapter and Compiler

Proto UI deliberately supports two execution routes:

### 2.1 Adapter Route (Current, Practical)

- Prototypes are written in the **same language as the adapter**.
  - React Adapter → JavaScript / TypeScript prototypes
  - Flutter Adapter → Dart prototypes

- The adapter **does not extract semantics** from functions.
- Functions are executed as-is, using the host language runtime.
- This route prioritizes:
  - feasibility
  - completeness
  - real-world usability

Adapters are the proof that Proto UI’s model is executable.

---

### 2.2 Compiler Route (Future, Preferred)

- Prototypes written in different languages are **parsed into a neutral DSL**.
- A compiler consumes this DSL instead of language-specific code.
- Semantic intent is extracted from:
  - template structure
  - props/state/context specifications
  - rule expressions

- **Function bodies are not semantic assets**.

This route prioritizes:

- cross-platform portability
- lossless transformation
- long-term maintainability

The compiler route is considered the _ideal form_ of Proto UI execution.

---

## 3. Why Proto UI Does Not “Serialize Functions”

Proto UI does **not** attempt to serialize functions.

This is a deliberate decision.

Functions:

- are language-specific
- often rely on closures and runtime context
- are difficult or impossible to translate losslessly

Instead, Proto UI distinguishes between:

- **Executable code** (functions)
- **Semantic intent** (explicit declarations)

Only semantic intent is expected to be portable.

---

## 4. Where Semantic Intent Must Live

To support portability and integration, **important intent must be explicit**:

- Visual structure → `template`
- External inputs → `props`
- Internal state → `state`
- Conditional behavior → `rule`
- Cross-component wiring → `context`

If behavior affects:

- rendering
- styling
- accessibility
- cross-platform behavior

then it should be expressed through these systems, not hidden inside function bodies.

Rule is especially important here:

- rule expressions are **fully parseable**
- rule semantics are **language-independent**
- rule is a key bridge between Adapter and Compiler routes

---

## 5. Functions in Prototypes: What They Are (and Are Not)

Functions are allowed in prototypes, but with a clear interpretation:

- Functions are **runtime implementation details**
- They are **not guaranteed to be portable**
- They are **not part of Proto UI’s semantic surface**

In practice, functions commonly serve as:

- local event handlers
- convenience wrappers
- adapters to host APIs

This is acceptable in the Adapter route.

However, relying on functions to express core semantics will make a prototype **hard or impossible to compile losslessly**.

---

## 6. Context Values and Functions

Context values may include functions.

These functions are treated as:

- opaque runtime references
- valid only within the adapter’s execution environment

Proto UI does not assume:

- functions can be serialized
- functions can be transferred across runtimes
- functions represent portable intent

If a context-provided capability is expected to be portable, it should be expressed as:

- explicit state
- explicit rule intent
- or a structured capability object (future direction)

---

## 7. Portable Subset (Direction, Not Enforcement)

Proto UI aims to define a **portable subset of prototype syntax**.

This subset:

- avoids language-specific semantics
- avoids dynamic metaprogramming
- expresses intent declaratively

In v0:

- this subset is **not strictly enforced**
- adapters may accept richer language features

In future versions:

- certain patterns may be restricted
- diagnostics may warn about non-portable constructs
- compiler-friendly subsets may be documented explicitly

This gradual approach avoids blocking real usage while keeping the long-term path clear.

---

## 8. Why This Matters for Integration

Integration tests assume that:

- semantics are explicit
- composition is deterministic
- behavior is not hidden in opaque code paths

By keeping functions out of the semantic core, Proto UI ensures that integration tests remain:

- stable
- analyzable
- meaningful across adapters

---

## 9. Summary

- Integration verifies **composition**, not new semantics.
- Adapters execute language-native prototypes.
- Compilers consume semantic intent, not function bodies.
- Functions are allowed but non-portable by default.
- Explicit systems (state, rule, context, template) carry meaning.
- Portability is achieved by restriction and clarity, not by serializing code.

This separation is foundational to Proto UI’s long-term design.
