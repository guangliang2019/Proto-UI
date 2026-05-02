# @proto.ui/cli

Proto UI command line helpers for initializing a local `proto-ui/` workspace and generating CSS resources used by Proto UI prototype libraries.

The CLI currently focuses on launch preparation tasks:

- create a minimal `proto-ui/` workspace with adapter, prototype, and component folders
- install the selected adapter and prototype library packages when requested
- generate prototype token CSS
- generate the shadcn theme CSS
- generate a Tailwind entry CSS file that imports the theme and token files

It does not yet implement the full component add/generation flow described in the public Quick Start draft.

## Usage

```bash
npx @proto.ui/cli --help
npx @proto.ui/cli init
npx @proto.ui/cli init --adapter react --prototypes shadcn --install
npx @proto.ui/cli shadcn --styles-dir ./src/styles
```

## Commands

### `init`

Creates a local `proto-ui/` folder:

```txt
proto-ui/
├── adapters/
├── prototypes/
└── components/
```

It also writes `proto-ui/config.json` and, unless `--no-tailwind` is passed, generates the default shadcn CSS preset under `./src/styles`.

```bash
npx @proto.ui/cli init --adapter vue --prototypes shadcn --install
npx @proto.ui/cli init --defaults --no-tailwind
```

### `shadcn`

Generates the launch CSS preset files into a styles directory:

```bash
npx @proto.ui/cli shadcn --styles-dir ./src/styles
```

This writes:

- `prototype-tokens.generated.css`
- `shadcn-theme.css`
- `tailwindcss.css`

### `tokens`

Scans prototype source files for Proto UI Tailwind-style tokens and writes a generated CSS file.

```bash
npx @proto.ui/cli tokens --input ./packages/prototypes --out ./src/styles/prototype-tokens.generated.css
```

### `theme`

Writes a supported theme file.

```bash
npx @proto.ui/cli theme shadcn --out ./src/styles/shadcn-theme.css
```

### `tailwindcss`

Writes a Tailwind entry file that imports the generated theme and token CSS files.

```bash
npx @proto.ui/cli tailwindcss --out ./src/styles/tailwindcss.css
```

## Package Role

This package is a tooling surface for Proto UI launch workflows. It supports adapters and prototype libraries, but it is not itself the interaction protocol or a runtime adapter.

## License

MIT
