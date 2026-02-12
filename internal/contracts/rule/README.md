# Rule (English)

> Status: Draft – v0 (Positioning & Stance)
>
> This is the English contract set overview for rule.
> It explains rule's positioning, value, and stance on extension modules.

---

## 1. Positioning & Value

Rule is Proto UI's **declarative intent orchestration layer**:

- Expresses “condition -> intent” as serializable RuleIR
- Enables lossless cross-platform migration (e.g. TS prototype -> Dart prototype)
- Provides stable inputs for optimization and compilation

In v0:

- Rule is one of the highest leverage mechanisms
- It shifts behavior from imperative callbacks to analyzable data
- It lays groundwork for future compiler work without being invalidated by v1

---

## 2. Stance on Rule Extension Packages

Proto UI encourages rule extensions for **specific hosts / specific scenarios**:

- Intervene only when conditions are clearly satisfied (strong optimization)
- Integrate as modules without changing rule’s serializable core
- Preserve v0 best practices as reusable assets

These extensions are recommended (though not the primary v0 workstream).
Proto UI will actively encourage their accumulation.

---

## 3. Web Recommended Practice (v0)

When all are true:

- `when` depends on exposed state
- adapter enables `expose-state-web` (maps to CSS variables / DOM attributes)
- intent is only `feedback.style`

then the rule can be compiled into **static selector styles** with no runtime execution.
This is semantically equivalent and recommended in v0.

---

## 4. Forward Compatibility

Rule’s value does not disappear with compilers:

- Clearer semantics create more optimization/compile headroom
- Discovered best practices are retained as reusable extensions

Rule extensions are long-term assets, not short-term hacks.

---

## 5. Execution Layer (Overview)

Execution has three layers:

- **rule core**: evaluate + merge, default output is Plan
- **executor**: separate module, turns Plan into execution
- **adapter**: can customize executor via host-cap

Extensions may **short-circuit Plan** when conditions are met and execute directly or delegate to adapter.

---

## 6. Contract Index (v0)

When dependencies:
- `when.expr.v0.md`
- `when.deps.props.v0.md`
- `when.deps.state.v0.md`
- `when.deps.context.v0.md`
- `when.deps.state.wiring.v0.md`
- `when.deps.context.wiring.v0.md`

Intent capabilities:
- `intent.compose.v0.md`
- `intent.feedback.style.v0.md`
- `intent.state.v0.md`

Other:
- `define.setup-only.v0.md`
- `runtime.apply.v0.md`

---

## 7. Test Matrix Index (Suggested)

When dimensions:
- props
- state (Owned / Borrowed / Observed)
- context

Intent dimensions:
- feedback.style
- state.set

Suggested combinations:
- when.props x intent.feedback.style
- when.state(Owned/Borrowed/Observed) x intent.state
- when.context x intent.feedback.style
- when.context x intent.state

