# @proto.ui/cli

Local CLI package for generating Proto UI Tailwind assets.

## Commands

- `proto-ui shadcn [--styles-dir <dir>]`
- `proto-ui tokens --input <dir> --out <file>`
- `proto-ui tailwindcss --out <file> [--theme-import <path>] [--tokens-import <path>]`
- `proto-ui theme shadcn --out <file>`

`proto-ui shadcn` writes these preset files directly:

- `prototype-tokens.generated.css`
- `tailwindcss.css`
- `shadcn-theme.css`
