# 2026-04-03 Prototype Library Quality Audit

> Internal record. Not normative. This document captures a focused audit pass on prototype-library authoring quality after the dropdown/anatomy work.

---

## 1) Context

After the dropdown investigation, several broader prototype-library quality issues became visible:

- unnecessary render wrappers were still common
- anatomy family usage had drifted into `register*Family(def)` helpers
- helper shapes that take `def` as an external parameter needed review
- prototype/asHook organization needed a clearer quality bar

This audit was meant to separate:

- clear cleanup work we should just do
- system API gaps
- areas that still need larger design decisions

---

## 2) Findings

### 2.1 Unnecessary render wrappers were widespread

Many prototypes were still returning:

- `return (r) => r.el('div', r.r.slot())`
- `return (r) => r.el('button', r.r.slot())`
- `return (r) => r.el('span', r.r.slot())`

even when the prototype had no attached structure beyond the default slot.

This was treated as non-compliant with the current authoring direction and removed.

### 2.2 `register*Family(def)` was a system-shape smell, not just local style debt

This pattern existed because anatomy family declarations were not embedded in the family value itself.

Once `createAnatomyFamily(..., decl)` and claim-time auto-registration were added, these helpers could be removed cleanly.

So that pattern should be understood as:

- evidence of an anatomy API limitation that has now been improved
- not a preferred library-authoring abstraction

### 2.3 Ordinary prototype code no longer needs external `helper(def)` patterns

After the anatomy change, the remaining ordinary prototype and shadcn prototype code no longer uses `register*Family(def)`-style helpers.

That is a good sign:

- internal local helpers can stay local
- reusable logic can continue to move toward `asHook`
- fewer authoring paths now depend on manually passing `def` through external functions

### 2.4 The main remaining exception is privileged collection hooks

The remaining `def`-adjacent helper pattern is inside:

- `packages/prototypes/base/src/tools/as-collection.ts`
- `packages/prototypes/base/src/tools/as-collection-item.ts`

These hooks still read the anatomy port through privileged access.

This is currently accepted because they serve a privileged role:

- live structural snapshots
- cross-phase reads
- expose getters that cannot be expressed purely through ordinary callback-time reads

This should not be treated as a normal author-facing pattern.

---

## 3) Current classification rule

When a helper takes `def` from outside the current setup body, review it against three buckets:

1. local internal factoring  
   If the logic is only used inside one setup body, keep it local instead of exporting a helper that takes `def`.

2. reusable behavior  
   If multiple prototypes need it, prefer an `asHook` instead of a `helper(def)` utility.

3. system API gap  
   If neither of the above works, the helper is probably compensating for a missing system API and should be treated as design debt, not normalized as a pattern.

---

## 4) Current outcome

At the end of this audit pass:

- unnecessary slot-only render wrappers were removed
- anatomy family registration helpers were removed
- stable family declarations now prefer `createAnatomyFamily(..., decl)`
- ordinary prototype code is largely free of exported `helper(def)` patterns
- the remaining exception is the privileged collection tooling

---

## 5) Open follow-up

### 5.1 Should `asCollection` remain privileged long-term?

Probably yes for now, but its special status should stay explicit.

### 5.2 Should prototype/asHook same-source organization be pushed further?

Probably yes, but that is a separate structural cleanup from this audit.

### 5.3 Should there be a documented repository rule against new `helper(def)` exports?

Likely yes.

This should probably land first as an internal engineering guideline before becoming broader documentation.
