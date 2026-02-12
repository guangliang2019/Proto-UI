# @proto-ui/modules.rule

This module provides the **rule core** (IR compile + evaluation + plan output)
plus an optional **default executor** (as a sibling capability).

- Rule core owns Plan generation.
- Extensions may short-circuit Plan via core ports.
- Adapters may customize/replace executors via host-caps.

(Details live in contracts under `internal/contracts/rule`.)
