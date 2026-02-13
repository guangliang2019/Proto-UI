## CONTRACT_DEBT(v0): terminology.exec-phase

### What to do

Unify terminology across all v0 contracts:

- Any statement that uses **"setup-only" / "runtime-only"** (or similar phrasing) MUST explicitly anchor its definition to the **exec-phase** concept.
- The anchor may point to either:
  - a canonical wiki-style terminology page for exec-phase, OR
  - the normative contract: `lifecycle/exec-phase-guard.v0.md`
- The goal is to eliminate “floating” phase language that is not formally defined, so the contract book has a single, stable semantic reference.

### Why this matters

Without an explicit exec-phase anchor, “setup/runtime” wording risks drifting into:

- host-specific lifecycle confusion,
- inconsistent interpretations between runtime vs adapters,
- accidental re-definition of phase rules inside module contracts.

### Check focus (highest risk)

The following modules were authored before exec-phase was made explicit, so they are more likely to contain unanchored wording and should be checked first:

- props
- event
- state
- rule

### Acceptance criteria (for closing this debt)

- No v0 contract contains setup-only/runtime-only style constraints **without** referencing exec-phase as the canonical definition.
- If a document introduces derived terms (e.g. “callback-only”, “render-time”), it must define them as a mapping on top of exec-phase (not as a separate model).
