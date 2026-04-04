# internal/contracts/anatomy/family-declaration.v0.impl-notes.md

> Informal notes. Not normative. This document captures the current intended usage of anatomy family declaration and claim behavior until a formal spec/contract text is written.

---

## 1) Core distinction

Anatomy family declaration is a different concern from anatomy query policy.

- query policy answers: what should a read do if the current domain cannot be resolved right now?
- family declaration answers: where does the family structure definition live, and when is a claim allowed to bind against it?

These should not be conflated.

---

## 2) Current preferred shape

Stable anatomy families should prefer:

- `createAnatomyFamily(debugName, decl)`

This makes the family value itself carry its canonical declaration.

That in turn allows:

- root and non-root parts to `claim()` the family without first calling `def.anatomy.family(...)`
- family definitions to live outside any individual prototype instance
- root-only or externally predeclared family usage to remain valid

---

## 3) Role of `def.anatomy.family(...)`

`def.anatomy.family(...)` still exists, but it should now be treated as a secondary tool.

Current intended uses:

- dynamic or local declaration at setup time when the family cannot be declared statically
- explicit override / registration in tests or low-level experiments
- compatibility with older call sites not yet migrated to embedded declarations

It should not be the default shape for stable library families.

---

## 4) Why `register*Family(def)` helpers are discouraged

Helpers like:

- `registerDropdownFamily(def)`
- `registerTabsFamily(def)`

are a smell in most cases.

They are usually evidence that:

- the family declaration is stable
- the family really belongs to the shared family value
- but the API shape forced authors to re-register it from each part

If the family is stable and shared, prefer embedding the declaration in the family value instead.

---

## 5) Relation to the earlier dropdown/anatomy issue

This is not the same as the transient invalid-domain issue.

That earlier issue was about:

- a family already existing
- domain resolution temporarily failing during structural transitions

This issue is about:

- whether the family declaration is even available at claim time

So:

- query policy solves transient reads
- embedded family declarations solve claim-time declaration locality

Both may surface during anatomy-heavy prototype work, but they are different classes of problem.

---

## 6) Current recommendation for maintainers

When adding a new stable family:

1. Prefer `createAnatomyFamily(debugName, decl)`.
2. Let root and parts call only `def.anatomy.claim(...)`.
3. Avoid introducing new `register*Family(def)` helpers.
4. Only use `def.anatomy.family(...)` when the declaration is genuinely setup-local or dynamic.

If a helper still seems necessary, first ask whether the system API is missing a better declaration surface.
