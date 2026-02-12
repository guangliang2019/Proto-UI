# Context Contract Index

This directory defines **context** contracts for Proto UI.

Context is the **component-to-component** communication channel that is:

- **tree-based** (logical tree; WC uses DOM tree)
- **provider → consumer** (single direction in v0)
- **nearest provider wins**
- **setup-only** for subscription intent
- **runtime-only** for reads and updates
- **JSON-serializable object values** in v0

These contracts define semantics and phase rules. Integration tests may verify composition (e.g. context → rule → style), but MUST NOT introduce new semantics beyond referenced contracts.

---

## Contract Set (v0)

- `with-tree.v0.md`
- The normative contract for v0 context covers:
- ContextKey identity and debug name
- provider resolution (nearest wins)
- provide/subscribe/trySubscribe phase rules
- read/tryRead/update/tryUpdate phase rules
- tree rebind behavior (no notifications in v0)
- value constraints and portability scope
- subscription callback semantics
- error model (codes or equivalent)

- `with-tree.v0.impl-notes.md`
- Non-normative implementation notes include:
- recommended internal data structures
- validation and performance tradeoffs
- suggested guard strategy and error codes

---

## Naming Convention

- Contract docs: `<topic>.v0.md` or `<topic>.v0.impl-notes.md`
- Contract tests (recommended): `packages/<pkg>/test/contract/context.<topic>.v0.contract.test.ts`

---

## Out of Scope (v0)

- Bidirectional/peer communication channels outside context
- Connection-change notifications (e.g. onConnected/onDisconnected callbacks)
- Compiler-stage portability and AST-based extraction
- Host-specific capabilities (e.g. `def.host`)

---

## Related Contracts

Context often composes with:

- `rule` (when/then evaluation)
- adapter realization contracts (host tree representation, lifecycle)
