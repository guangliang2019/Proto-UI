# Proto UI (Refactor Workspace)

This repository is an active refactor workspace for **Proto UI**.

It exists to restructure the core architecture using a **contract-driven approach**.  
Once the refactor reaches a stable point, its contents will replace the current Proto UI main repository.

If you are looking for **current progress**, this repo is the right place.  
The main Proto UI repository may appear quiet during this phase by design.

---

## What is happening here

This refactor focuses on:

- Making runtime semantics explicit and testable
- Freezing v0 contracts module by module
- Reducing implicit coupling between systems (props, template, lifecycle, etc.)
- Preparing a stable foundation for official prototypes and asHook accumulation

The work is incremental and contract-first:
each module is clarified → frozen → covered by contract tests before moving on.

---

## Current status

- ✅ **Template v0** — frozen
- ✅ **Runtime lifecycle (with host) v0** — frozen
- ✅ **Props v0** — refactored, frozen, and fully covered by contract tests

Upcoming work is expected to move toward:

- feedback
- rule (built on top of stabilized props & feedback)

Details live in `/internal/contracts` and corresponding `*.contract.test.ts` files.

---

## About contribution

This repository is not optimized for casual drive-by contributions yet.

If you are interested in:

- contract design
- runtime semantics
- protocol-oriented UI architecture

feel free to open discussions or reach out first.  
The architecture is still being actively shaped, but some modules are already considered stable.

---

## Note

This is a **temporary workspace repository**.

When the refactor is complete, its contents will be merged into and replace the main Proto UI repository, which already contains the full project configuration and public-facing setup.
