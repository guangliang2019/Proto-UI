# Proto UI Versioning Policy

> Internal governance document. This policy defines how Proto UI versions should be interpreted during the `v0` and `v1` stages, and how maintainers should communicate compatibility expectations across packages.

---

## 1. Purpose

This document exists to make Proto UI versioning predictable for:

- maintainers planning releases
- contributors preparing changes across packages
- users deciding which package versions are safe to combine

It is not a contract specification by itself.

It is a project governance rule for how version numbers should be used and explained.

---

## 2. Stage Model

Proto UI currently plans around two product stages only:

- `v0`
- `v1`

These stages are intentionally larger than ordinary semantic-versioning milestones.

### 2.1 `v0`

`v0` is the early public stage.

It is public and usable, but it does not promise that every minor version is freely mixable with every other minor version.

Within `v0`, Proto UI may still introduce breaking changes at the level of:

- sub-APIs
- option names or option meanings
- configuration shapes
- cross-package assumptions
- generated output details

### 2.2 `v1`

`v1` is the next stage of maturity.

Moving from `v0` to `v1` is expected to strengthen stability expectations, but it is **not** expected to introduce a large architectural reset.

For Proto UI, `v1` should remain compatible with the core concepts and overall paradigm established in `v0`.

That means:

- no broad redefinition of first-level concepts
- no replacement of the overall model
- no "Proto UI 2.0 in disguise" release behavior

---

## 3. Package Coordination Rule

During `v0`, production users should treat the Proto UI package minor version as a shared compatibility boundary.

Recommended user rule:

- keep all `@proto.ui/*` packages on the same minor version

Examples:

- acceptable: `0.1.2` with `0.1.7`
- not recommended: `0.1.x` with `0.2.x`

This rule exists because Proto UI package compatibility is defined at the ecosystem level, not only at the single-package level.

Even if one package looks independently compatible, mixing different minor lines may produce confusing behavior due to cross-package assumptions.

---

## 4. Repository Versioning Strategy

Proto UI should use a lockstep versioning strategy for public packages during `v0`.

In practice, that means:

- public packages move together by release line
- the repo communicates one current minor line at a time
- patch releases may include only a subset of packages changing internally, but published package versions should remain aligned where practical

This keeps the release story legible and avoids placing dependency-solving work on users during an early stage of the project.

---

## 5. Meaning Of `0.y.z`

Proto UI follows semantic version formatting, but interprets `0.y.z` with additional project-specific discipline.

### 5.1 Minor version: `y`

`0.y.0` represents a new capability line for the Proto UI ecosystem.

A new minor version should be used when a release includes one or more of the following:

- meaningful new user-facing capabilities
- newly promoted public package surfaces
- changes to cross-package behavior assumptions
- breaking changes in sub-APIs or configuration expectations
- release-line changes that require users to upgrade packages together

For Proto UI `v0`, minor is the main ecosystem coordination boundary.

### 5.2 Patch version: `z`

`0.y.z` patch releases should stay within one minor line.

Patch releases are the safe update boundary inside that line and should be used for:

- bug fixes
- docs fixes
- test and tooling improvements
- type fixes
- packaging fixes
- small implementation refinements that do not change the intended release-line behavior

If a change causes users to reconsider whether packages from the same line can still be upgraded safely, it should probably not be treated as patch-only.

---

## 6. Maintainer Decision Rules

When deciding whether a change should be patch or minor during `v0`, use these defaults:

- default to `patch` for local fixes and hardening
- use `minor` for any release that changes how the ecosystem should be consumed

If maintainers are unsure, prefer asking:

"Would a careful user reasonably need to align their whole Proto UI stack differently because of this change?"

If the answer is yes, prefer a new minor release line.

---

## 7. User-Facing Communication Rules

Public release notes, package docs, and installation guides should consistently communicate the following:

- Proto UI is currently in `v0`
- all Proto UI packages should stay on the same minor version in production
- patch updates are the expected safe upgrade path within a chosen minor line
- `v1` is expected to improve stability promises without changing the project's core architecture

We should not imply stronger compatibility guarantees than the project can actually maintain.

---

## 8. Summary

Proto UI versioning should be understood as:

- two planned stages: `v0` and `v1`
- no architectural reset between `v0` and `v1`
- lockstep public package management during `v0`
- minor version as the shared ecosystem compatibility boundary
- patch version as the safe update boundary within that minor line
