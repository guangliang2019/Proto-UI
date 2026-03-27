# @proto.ui/runtime

Proto UI runtime that executes prototypes under the Proto UI contracts.

## Purpose

Implements the runtime execution flow that adapters can host under the Proto UI contracts.

## Package Role

Runtime package that coordinates setup, rendering, lifecycle, module orchestration, and host execution boundaries.

## Install

```bash
npm install @proto.ui/runtime@0.0.1
```

## Internal Structure

- `src/index.ts`
- `src/instance/`
- `src/kernel/`
- `src/orchestrator/`

## Related Internal Packages

- `@proto.ui/core`
- `@proto.ui/module-anatomy`
- `@proto.ui/module-as-trigger`
- `@proto.ui/module-base`
- `@proto.ui/module-context`
- `@proto.ui/module-event`
- `@proto.ui/module-expose`
- `@proto.ui/module-expose-state`
- `@proto.ui/module-expose-state-web`
- `@proto.ui/module-feedback`
- `@proto.ui/module-focus`
- `@proto.ui/module-overlay`
- `@proto.ui/module-props`
- `@proto.ui/module-rule`
- `@proto.ui/module-rule-expose-state-web`
- `@proto.ui/module-rule-meta`
- `@proto.ui/module-state`
- `@proto.ui/module-state-accessibility`
- `@proto.ui/module-state-interaction`
- `@proto.ui/module-test-sys`
- `@proto.ui/types`

## License

MIT
