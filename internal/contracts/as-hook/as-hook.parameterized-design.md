# Parameterized asHook Design Notes

> Status: Draft note
>
> This note captures the intended author-facing shape for future parameterized/configurable authored asHooks.

---

## 1. Goal

Proto UI wants authored asHooks to become the mainstream logic-reuse entry.

That means authored asHooks should stay close in ergonomics to ad-hoc helpers like:

```ts
function useX(def, options?) {
  ...
}
```

while still preserving the semantic benefits of asHook:

- trace
- dedupe / installation mode
- captured effects
- future conflict diagnostics
- future rollback-friendly structure

---

## 2. Non-Goal

This design does **not** change the prototype nature of asHook.

In particular:

- `setup` remains the primary entry
- `setup` return value remains `RenderFn | void`
- parameterization must not turn asHook into a separate mini-language

---

## 3. Target Authoring Shapes

### 3.1 Install-only hook

```ts
const asButtonBehavior = defineAsHook({
  name: 'asButtonBehavior',
  mode: 'once',
  setup(def) {
    ...
  },
});
```

Usage:

```ts
asButtonBehavior();
```

### 3.2 Simple configurable hook

```ts
const asEscapeKey = defineAsHook({
  name: 'asEscapeKey',
  setup(def, options?: EscapeKeyOptions) {
    ...
  },
  configure(config, options) {
    ...
  },
});
```

Usage:

```ts
asEscapeKey();
asEscapeKey({ enabled: true });
asEscapeKey({ onEscape: close });
```

### 3.3 Complex configurable hook

```ts
const asFocusBits = defineAsHook({
  name: 'asFocusBits',
  setup(def, options) {
    ...
  },
  configure(config, options, tools) {
    tools.merge('restore', options.restore);
    tools.merge('entry', options.entry);
    tools.conflict('scopeKey', options.scopeKey);
  },
});
```

---

## 4. Why `configure(...)` Exists

If parameterized asHooks become common, it is not acceptable to force authors into:

- rerunning arbitrary setup logic
- manually tracking "first install" vs "later patch"
- writing their own singleton-install machinery

Therefore:

- `setup(...)` should stay install-oriented
- `configure(...)` should carry patch/merge semantics

This keeps prototype syntax clean while still enabling configurable logic reuse.

---

## 5. Why `configure(...)` Should Not Receive Full `def`

If `configure(...)` received unrestricted `def`, authors could accidentally rerun:

- `def.props.define(...)`
- `def.state.bool(...)`
- `def.event.on(...)`
- `def.context.provide(...)`

That would effectively recreate duplicate-install hazards under a different API name.

So the preferred direction is:

- `setup(...)` receives full `def`
- `configure(...)` receives hook-owned configuration surface only

Possible examples of a configuration surface:

- hook-owned handles created during setup
- hook-owned mutable configuration objects
- helper methods intentionally exposed by the hook definition runtime

---

## 6. Installation Modes

Proposed mainstream meanings:

- `configurable`
  - install once
  - later calls route into configuration patching

- `once`
  - repeated calls are skipped
  - essentially configurable-without-patch-surface

- `multiple`
  - each call is a distinct installation
  - should remain explicit and uncommon

This note assumes the long-term default may move toward `configurable`, but only if the runtime gives configurable hooks a safe and structured patch path.

---

## 7. Mergeability

Configurable hooks often need three classes of fields:

- mergeable
- override-with-warning
- conflict-and-throw

This note assumes those distinctions should be made explicit by the hook author, not hidden in heuristics.

Examples:

- `restore` may be latest-wins
- `entry` may be latest-wins
- `scopeKey` may be conflict-only

---

## 8. Desired Outcome

Authors should feel that parameterized asHooks are:

- easier to reason about than ad-hoc helper functions
- not significantly more annoying to write
- powerful enough for most reusable logic patterns

Proto UI should retain the option to recommend:

- simple hooks for most authors
- configurable hooks for library authors
- explicit `multiple` only for advanced cases
