# 2026-04-03 Dropdown / Anatomy / Context Record

> Internal record. Not normative. This document preserves the observed facts and current decision state around the dropdown-menu work and the anatomy/context discussion.

---

## 1) Context

While implementing dropdown-menu, several worktree changes accumulated across:

- base dropdown prototypes
- web event routing
- web-component adapter behavior
- shadcn dropdown demo integration

The immediate user concern was not only whether dropdown worked, but whether the implementation still respected Proto UI's stated boundaries:

- prototypes should not assume a browser or DOM host
- prototypes should not silently depend on host timing details unless that dependency is made explicit
- `press.commit` should remain the semantic confirmation event
- adapters should map host confirmation interactions into `press.commit`
- prototype code should not regress into native-event glue patches

---

## 2) Observed Facts

### 2.1 Prototype-layer regressions were introduced

The dropdown prototype had temporarily gained logic that directly depended on host/browser details such as:

- `document.activeElement`
- `HTMLElement`
- `tagName`
- `setTimeout(...)` for keyboard/click dedupe

Those changes lived in the dropdown prototype itself instead of the adapter/event-routing layer.

### 2.2 Event routing was the real responsibility boundary

The actual problem was that keyboard confirmation inside adapter roots was not being carried into `press.commit` in a stable way.

This was correctly addressed in the web event router layer, not in the prototype layer.

### 2.3 A runtime error exposed a second issue

Browser error observed:

`[Anatomy] current instance is not part of a valid domain for 'base-dropdown'`

The error came from `as-collection-item` during synchronization, not from dropdown business logic itself.

The direct cause was:

- getter-time fallback had already been added for invalid anatomy domains
- but mounted/updated sync paths still used strict order queries
- therefore a transient invalid-domain window still threw

### 2.4 This was not the same as optional context semantics

The discussion clarified that:

- `context.try*` expresses semantic optionality
- anatomy missing-domain handling here does not express semantic optionality
- it expresses query policy during transient structural instability

This distinction matters and should be reflected in API shape.

---

## 3) Problem Statement

Proto UI needed a way to handle transient invalid anatomy-domain windows without pretending that anatomy itself is semantically optional.

If we exposed anatomy `try*` APIs in the same style as context `try*`, the public API would blur two very different meanings:

- optional semantic dependency
- transient-safe structural query

That would be misleading.

At the same time, only solving the issue inside `asCollection` would also be insufficient, because the underlying issue is a general anatomy query problem, not a collection-only problem.

---

## 4) Decision

### 4.1 Keep `context.try*` as semantic optionality

`context.tryRead` / `trySubscribe` / `tryUpdate` continue to mean:

- the upstream context may or may not exist
- both cases are semantically valid

### 4.2 Do not keep public `run.anatomy.try*` as the long-term API shape

Anatomy transient-safe access is represented instead through query options on the existing API surface.

Current shape:

- `run.anatomy.parts(family, { missing: 'null' | 'empty' })`
- `run.anatomy.partsOf(family, role, { missing: 'null' | 'empty' })`
- `run.anatomy.order.version(family, { missing: 'null' })`
- `run.anatomy.order.indexOfSelf(..., { missing: 'null' })`
- `run.anatomy.order.prevOfSelf(..., { missing: 'null' })`
- `run.anatomy.order.nextOfSelf(..., { missing: 'null' })`

Default behavior remains strict.

### 4.3 Treat this as query policy, not protocol semantics

`missing: 'null' | 'empty'` does not mean anatomy is optional.

It only means:

- this caller is doing a tolerant query
- the query may run during a transient invalid-domain window
- returning `null` or `[]` is preferable to throwing for this specific read site

### 4.4 `asCollection` remains privileged for now

`asCollection` and `asCollectionItem` still rely on anatomy module ports because they expose live structural data across non-callback read paths:

- expose getters
- state getter wrappers
- collection snapshot reads outside strict callback entry points

This is not because collection alone owns the problem.

It is because cross-phase structural lazy reads are currently a privileged capability.

---

## 5) Rationale

### 5.1 Why not use public anatomy `try*`?

Because it looks too similar to `context.try*`, and that similarity would be semantically wrong.

### 5.2 Why not keep only internal fixes inside `asCollection`?

Because the root issue is shared by any code that performs anatomy reads during transient structural windows.

The system needs a general answer, even if only some hooks currently need privileged cross-phase access.

### 5.3 Why keep strict anatomy reads at all?

Because many interaction paths should still fail loudly when required structure is missing.

Examples:

- behavior that requires a valid family/domain to be meaningful
- structure-dependent interaction decisions
- places where silent fallback would hide real composition errors

---

## 6) Current Usage Guidance

Use strict anatomy queries by default.

Use tolerant anatomy queries only for:

- derived display information
- cached structural snapshots
- read-only synchronization that can legitimately defer until structure stabilizes

Do not use tolerant anatomy queries for:

- commit/submit/confirm decisions
- required interaction routing
- places where invalid structure should remain a hard error

Use `context.try*` only when the context is semantically optional, not when the system is merely in a transient bad state.

---

## 7) Work Completed In This Round

- removed browser/DOM/timer glue from dropdown prototype logic
- retained `press.commit` mapping in adapter event routing
- fixed `as-collection-item` sync path to avoid throwing during transient invalid-domain windows
- replaced public anatomy `try*` API usage with query-policy options
- added tests covering tolerant anatomy query behavior

---

## 8) Open Questions

### 8.1 Should `AnatomyPort` eventually expose a more explicit non-callback query contract?

Right now ports can serve cross-phase reads, but the conceptual contract is still implicit.

### 8.2 Should Proto UI define a stronger notion of structural stabilization?

If yes, some tolerant reads might later be replaced by an explicit "structure-ready" phase or callback.

### 8.3 Should engineering docs later formalize the distinction between:

- semantic optionality
- transient-safe query policy
- invalid composition

Likely yes.

### 8.4 Is the later anatomy family-declaration issue the same problem?

Current answer: no, they are related but distinct.

The transient invalid-domain issue discussed in this record was about:

- a valid family existing in principle
- a claim already being part of the intended composition
- a temporary window where domain resolution was not currently stable

The later family-declaration issue was about something different:

- `claim()` required the family declaration to have been registered already
- `AnatomyFamily` itself did not carry the family declaration
- therefore authors were pushed toward `register*Family(def)` helpers in every part

That was not merely a transient-window problem.

It was an API-shape limitation in anatomy:

- family definition lived outside the `AnatomyFamily` value
- claim-time behavior could not recover from declaration order
- root-only declaration or external predeclared family usage was not first-class

So the current model should distinguish these as two independent issues:

1. transient invalid-domain windows  
   solved via anatomy query policy (`missing: 'null' | 'empty'`) for tolerant read sites

2. family declaration locality / claimability  
   solved by letting `createAnatomyFamily(..., decl)` embed the family declaration and by allowing claim-time auto-registration from that embedded declaration

The two issues can interact in practice because both surface as anatomy lookup pain, but they should not be collapsed into one diagnosis.

---

## 9) Promotion Candidates

If this area stabilizes, parts of this record should later move into:

- engineering docs: guidance on anatomy/context usage
- specs/contracts: exact behavior of anatomy query policies
- specs/contracts: anatomy family declaration and claim behavior
- asHook guidance: when privileged hooks are justified
