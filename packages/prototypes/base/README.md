# @proto.ui/prototypes-base

Base Proto UI prototype library for reusable interaction prototypes.

## Purpose

Provides the base Proto UI prototype library and reusable interaction prototypes that work with Proto UI adapters.

## Package Role

Prototype library package intended to be consumed together with Proto UI adapters.

## Install

```bash
npm install @proto.ui/prototypes-base@0.0.1
```

## Internal Structure

- `src/behaviors/`
- `src/button/`
- `src/dropdown/`
- `src/hover-card/`
- `src/index.ts`
- `src/switch/`
- `src/tabs/`
- `src/toggle/`
- `src/tools/`

## Behavior Authoring Constraints

- Behavior-layer helpers in `src/behaviors/` own interaction semantics, but they should depend on public hook/runtime surfaces instead of internal ports.
- Behavior correctness must not depend on microtask timing or any other host thread-model assumption.
- Behavior correctness must not depend on event bubbling/capturing order. If one keyboard event must only trigger one navigation step, use an explicit event-local guard and document it.
- It is acceptable to consume normalized keyboard data such as `event.detail.key`. Avoid reading host-specific `event.target` details unless the behavior contract explicitly requires it.

## Select Interaction Notes

- `select.item.active` tracks the committed select value instead of the transient roving focus cursor.
- When a select has no committed value yet, opening the content may still establish a roving start point for keyboard navigation, but no item should be exposed as active until a value is selected.

## Related Internal Packages

- `@proto.ui/core`
- `@proto.ui/hooks`

## License

MIT
