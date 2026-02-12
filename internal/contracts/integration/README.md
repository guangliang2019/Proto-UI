# Integration Contract Index

This directory indexes **composition-level contract tests**, such as:

- props -> style
- state -> style
- context -> style
- event -> effect
- etc.

These tests validate that multiple modules compose correctly.
They are not intended to define new semantics beyond the referenced contracts.

## Naming Convention

Integration contract test file naming:

- `packages/<adapter>/test/contract/<source>-to-<target>.v0.contract.test.ts`

Examples:

- `rule.props-to-style.v0.contract.test.ts`
- `rule.state-to-style.v0.contract.test.ts`

## Referenced Contracts

Each integration contract test MUST list the contracts it relies on
at the top of the file (as comments) and MUST be traceable to at least:

- a source contract (e.g. props)
- an orchestration contract (e.g. rule)
- a sink/realization contract (e.g. adapter apply-to-host, feedback export)

The integration test MUST NOT introduce new semantic rules that are not
present in referenced contracts.

## Current Matrix (v0)

- props -> style
  - relies on:
    - props: resolve/watch contracts
    - rule: when/then + runtime apply contracts
    - feedback: style merge + export contracts
    - adapter-web-component: feedback.style.apply-to-host contract
