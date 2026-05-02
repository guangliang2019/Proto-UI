# Proto UI CI/CD Guide

This document explains the GitHub Actions workflows in this repository and how they map to the v0 launch governance model.

The current target public release date is **May 14, 2026**, and the CLI launch target date is also **May 14, 2026**.

## Workflows

| Workflow | File | Purpose |
| --- | --- | --- |
| CI | `.github/workflows/ci.yml` | Pull request and branch quality gates (`check:types`, `test`) |
| Release Packages | `.github/workflows/release-packages.yml` | Manual/semi-automated release scan, stage rehearsal, and package publish |

## CI Workflow (`ci.yml`)

- Triggers:
  - `pull_request`
  - `push` on `main` and `feat/v0-release-prep`
  - `workflow_dispatch` (manual run)
- Jobs:
  - `type-check` runs `pnpm -s check:types`
  - `test` runs `pnpm -s test`
- Concurrency:
  - Cancels in-progress CI runs for the same branch to reduce queue pressure.

## Release Workflow (`release-packages.yml`)

This workflow is intentionally manual (`workflow_dispatch`) to reduce accidental publish risk.

### Inputs

- `mode`: `scan` / `stage` / `publish`
- `profile`: `launch` / `workspace`
- `include_approved_candidates`: include `approved` candidate packages
- `version`: required for `publish`
- `tag`: npm dist-tag (default `latest`)
- `only`: optional package filter
- `publish_delay_ms`, `max_publish_retries`, `retry_delay_ms`: npm 429 mitigation knobs

### Safety Rules

- `publish` mode is only allowed on:
  - `main`
  - `feat/v0-release-prep`
- `publish` mode requires `NPM_TOKEN`.
- Concurrency is enabled to avoid overlapping release runs on the same ref.

## Governance Coupling

Launch profile release selection is driven by:

- `internal/governance/launch-package-governance.json`

Script behavior:

- `--profile launch` selects only launch commitment packages by default.
- `--include-approved-candidates` additionally includes candidate packages with status `approved`.
- `--check-governance` fails when workspace packages are not mapped in governance, or governance is invalid.

## Required Secret

- `NPM_TOKEN` for real publish runs (`mode=publish`)

## Suggested Release Runbook

1. Run `scan` in `launch` profile and review `release-scan.json`.
2. Run `stage` (dry-run) with the same profile and filters.
3. Run `publish` with explicit `version` after maintainer confirmation.
4. If npm rate-limits occur (`429`), increase delay and retry settings before attempting again.

## Local Command Shortcuts

- `pnpm release:scan:launch`
- `pnpm release:stage:launch`
- `pnpm release:publish:launch`
