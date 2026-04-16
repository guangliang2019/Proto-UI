# Proto UI Release Workflow

> Internal governance document. This workflow defines how Proto UI should prepare a public release line before launch, how the preparation branch relates to `main`, and how the final release should be tagged.

---

## 1. Purpose

This document defines the release workflow for Proto UI's first-stage public releases.

It exists to answer:

- which branch should hold the pre-release preparation work
- how that branch should interact with `main`
- when a release branch or release tag should exist
- how version decisions should be reflected in release actions

---

## 2. Current Working Model

For the first public launch cycle, Proto UI is using a dedicated preparation branch:

- `feat/v0-release-prep`

This branch is **not** the final release branch.

It is the working branch for:

- release hardening
- package publication preparation
- docs alignment
- governance and process documents
- launch checklists and remaining v0 release tasks

`main` remains the protected branch and the final source for the release tag.

---

## 3. Branch Roles

### 3.1 `feat/v0-release-prep`

Use `feat/v0-release-prep` as the main integration branch for the four-week v0 release-preparation period.

This branch may:

- accumulate release-focused changes
- merge from `main` repeatedly to stay current
- host work that is too broad to keep as scattered one-off branches

This branch should not be treated as a public release signal by itself.

### 3.2 `main`

`main` remains the canonical protected branch.

When the release-preparation work is judged ready:

- merge `feat/v0-release-prep` into `main`
- validate the post-merge state on `main`
- create the final release tag from `main`

### 3.3 Release tag

For the first public release, the final tag should be created from `main`.

Recommended tag shape:

- `v0.1.0`

If needed, accompanying release notes may still refer to the release line as `release/v0.1.0`, but the Git tag itself should stay simple and canonical.

---

## 4. Why The Preparation Branch Is Not `release/v0.1.0`

Before launch, Proto UI still has substantial work remaining.

Using `release/v0.1.0` too early would blur two different meanings:

- a working branch for getting ready
- the actual final release identity

Keeping the preparation branch separate helps preserve a cleaner mental model:

- `feat/v0-release-prep` means "we are preparing the first public release"
- `v0.1.0` means "this exact state on `main` is the first public release"

---

## 5. Recommended Release Sequence

The recommended sequence is:

1. Continue release-preparation work on `feat/v0-release-prep`.
2. Merge from `main` into `feat/v0-release-prep` whenever needed to stay current.
3. Finish the remaining launch gates on the preparation branch.
4. Merge `feat/v0-release-prep` back into `main`.
5. Run the final release verification against the `main` state intended for publication.
6. Create the `v0.1.0` tag from `main`.

This keeps the final release identity tied to the protected canonical branch instead of to a long-lived working branch.

---

## 6. Versioning Expectations During `v0`

Release workflow must follow the versioning policy:

- public packages should stay on the same minor version
- patch updates are the safe update boundary within a minor line
- new minor lines should be used when Proto UI's ecosystem coordination boundary changes

For `v0.1.0`, this means the release should present one coherent package line rather than a mix of unrelated package minors.

---

## 7. Maintainer Rules During The Preparation Window

During the release-preparation window, maintainers should prefer:

- making the release story more truthful rather than more ambitious
- narrowing launch scope instead of widening it late
- merging from `main` often enough to avoid a painful final integration
- keeping governance, docs, packaging, and launch criteria visible in the same branch

The purpose of the preparation branch is not to hide unfinished work.

Its purpose is to concentrate release-critical work until it is ready to land on `main`.

---

## 8. Summary

Proto UI's current release workflow is:

- prepare on `feat/v0-release-prep`
- keep syncing with `main`
- merge back into `main` when launch criteria are met
- create the final `v0.1.0` tag from `main`

This keeps the preparation workflow flexible while keeping the public release identity clean.

---

## 9. GitHub Manual/Semi-Automated Package Release Flow (from 2026-04-16)

To align launch package governance with npm rate-limit risk, a manual GitHub Actions release workflow is introduced:

- `.github/workflows/release-packages.yml`
- trigger: `workflow_dispatch`
- modes:
  - `scan`: governance-aware scan, optionally archived as JSON artifact
  - `stage`: dry-run publish rehearsal
  - `publish`: real npm publish (requires explicit version input)

### 9.1 Launch Governance Enforcement

The workflow supports `--profile launch` with `--check-governance` by default.

That means:

- release selection is tied to `internal/governance/launch-package-governance.json`
- if workspace packages are added without governance mapping, the run fails
- candidate packages only join the release set when status is `approved` and `--include-approved-candidates` is explicitly enabled

### 9.2 npm 429 Mitigation

The publish flow now includes throttling and retry controls:

- `--publish-delay-ms`: delay between package publish requests
- `--max-publish-retries`: retry count for 429/rate-limit failures
- `--retry-delay-ms`: wait time before each retry (with incremental backoff)

Recommended launch defaults:

- `publish_delay_ms=3000`
- `max_publish_retries=2`
- `retry_delay_ms=15000`

If 429 errors appear, increase delay values first instead of increasing request pressure.

### 9.3 Management Policy

`publish` mode should remain maintainer-triggered (manual or semi-automated), not fully automatic.

Recommended controls:

- keep publish runs scoped to controlled branches (for example `feat/v0-release-prep` and final `main` release state)
- store npm credentials in GitHub Secrets (`NPM_TOKEN`)
- enforce who can publish through repository permissions or environment approvals
