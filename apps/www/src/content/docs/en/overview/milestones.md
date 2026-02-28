---
title: Milestones
description: Version positioning, semantic boundaries, and evolution path of Proto UI
---

## Summary

**Proto UI v0 represents the semantic closure phase of the protocol.**  
Core information channels and execution semantics are stabilized and validated across multiple hosts.  
Adapters serve as the primary execution path, while the Compiler will become the default in v1.

## Phase Comparison

| Dimension | v0 | v1 |
| --- | --- | --- |
| Essence | Protocol semantic closure | Stability & compatibility guarantees |
| Capability | Prototypes translated across web frameworks | Prototypes translated or compiled across web & native targets |
| Ecosystem | Official headless library & reference adapters | Systematic prototyping of widely-used component semantics |

> This table summarizes milestone differences. Formal definitions are described below.

## Current Phase

Proto UI is currently in the v0 phase.

v0 aims to achieve semantic closure of the protocol.  
Core semantics are stabilized, the model becomes verifiable, and cross-host execution is validated.

This is not a feature-complete UI framework release.  
It marks the transition from conceptual model to verifiable implementation.

## Goals of v0

The primary goals of v0 are to validate that:

- The information-flow model is structurally complete.
- Execution semantics remain stable.
- Prototypes can be translated across multiple hosts without semantic drift.
- The contract-driven architecture works in practice.

v0 confirms the viability of the protocol model.

---

## What v0 Guarantees

The following aspects are considered stable during v0:

### 1. Execution Semantics

- `exec-phase` behavior is regarded as stable.
- Lifecycle-related capability guards will not change in breaking ways.

### 2. Core Information Channels

- Core semantics of `props`, `event`, `expose`, `feedback`, `state`, and `context` are frozen.
- Existing contract expectations will not be reinterpreted.

New sub-APIs may be introduced, but existing meanings will not be altered.

### 3. Cross-Host Validation

- At least two Adapters provide complete prototype execution.
- Core modules are covered by contract tests.

### 4. Official Base Prototypes

- Official base prototypes cover common headless UI capabilities.
- They serve as semantic baselines for Adapter authors.

## Design Principles in v0

### Serializable Data Constraint

Information channels that accept or store data are expected to carry serializable payloads.

- Functions and host-specific objects are not part of protocol-layer semantics.
- Adapters may provide host-friendly conveniences at the boundary, while core semantics remain serializable.

This preserves cross-platform potential and future compiler viability.

### Role of Adapters

Adapters are treated as lossy translations of protocol semantics into host environments.

Adapters may optimize developer experience, but must not redefine protocol meaning.

## What v0 Does Not Guarantee

- Industrial-grade backward compatibility.
- Complete performance optimization.
- A mature Adapter ecosystem.
- Full semantic parity with future Compiler output.

Backward-compatible patches may be provided, but strict compatibility guarantees begin in v1.

## Relationship to v1

v0 validates the protocol model through Adapters.

v1 introduces the Compiler as the primary execution strategy.

In v1:

- API stability and backward compatibility are formally guaranteed.
- The Compiler becomes the recommended production path.
- Official adapters and compiler outputs are expected to remain semantically aligned.
- Performance improvements are primarily achieved through compilation.

---

## Conclusion

v0 confirms that the protocol semantics are coherent and transferable.  
v1 builds upon it with stability guarantees and generative capability.

Proto UI does not aim to replace existing component libraries, but to provide a protocol-level expression and cross-platform foundation for them.