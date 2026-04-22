# @proto.ui/prototypes-lucide

Lucide-based icon prototype helpers for Proto UI.

## Purpose

Provides:

- a standalone `lucide-icon` prototype (`asHook` + prototype form)
- `renderLucideIcon()` helper for embedding icon svg fragments in other prototypes

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
- `src/index.ts`
- `icons.config.json`
- `scripts/generate-icons.mjs`

## Generation

Generate icon registry from `lucide-static` using the configured icon list:

```bash
pnpm --filter @proto.ui/prototypes-lucide run generate:icons
```

The generated file is:

- `src/icon/icons.generated.ts`

## Related Internal Packages

- `@proto.ui/core`

## License

MIT
