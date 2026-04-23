# @proto.ui/prototypes-lucide

Lucide-based icon prototype helpers for Proto UI.

## Purpose

Provides:

- a standalone `lucide-icon` prototype (`asHook` + prototype form)
- per-icon static entrypoints for tree-shaking (`@proto.ui/prototypes-lucide/icons/*`)
- `renderLucideIcon()` helper for compatibility name-based rendering
- generated manifest/snippets/loaders for docs and lazy loading scenarios

## Source Attribution

- Icon visual definitions are derived from [Lucide](https://lucide.dev/).
- This package is a Proto UI-side consumption layer and is **not** an official Lucide package.
- Please keep upstream Lucide license/attribution in distribution and documentation workflows.

## Package Role

Prototype-oriented icon utilities for Proto UI render templates.

## Install

```bash
npm install @proto.ui/prototypes-lucide@0.0.1
```

## Internal Structure

- `src/icon/`
- `src/icons/` (generated single-icon modules)
- `src/shapes/` (generated shape-only modules for preview/lazy rendering)
- `src/index.ts`
- `src/manifest.generated.ts`
- `src/snippets.generated.ts`
- `src/loaders.generated.ts`
- `icons.config.json`
- `scripts/generate-icons.mjs`

## Generation

Generate icon modules from `lucide-static` using `icons.config.json`.

- `icons: "all"` means generate all upstream Lucide icons.
- `icons: [...]` means generate only the provided subset.

```bash
pnpm --filter @proto.ui/prototypes-lucide run generate:icons
```

Generated outputs include:

- `src/icons/<icon-name>.ts`
- `src/shapes/<icon-name>.ts`
- `src/icons/index.generated.ts`
- `src/icon/icons.generated.ts` (compat registry)
- `src/manifest.generated.ts`
- `src/snippets.generated.ts`
- `src/loaders.generated.ts`

## Recommended Consumption

- Static, tree-shakable import:
  - `import { renderLucideCheckIcon } from '@proto.ui/prototypes-lucide/icons/check'`
- Dynamic on-demand import by name:
  - `import { loadLucideIcon } from '@proto.ui/prototypes-lucide/loaders'`
  - `import { loadLucideIconShape } from '@proto.ui/prototypes-lucide/loaders'`
- Manifest/snippet for docs:
  - `import { LUCIDE_ICON_MANIFEST } from '@proto.ui/prototypes-lucide/manifest'`
  - `import { getLucideIconSnippet } from '@proto.ui/prototypes-lucide/snippets'`

## Related Internal Packages

- `@proto.ui/core`

## License

MIT
