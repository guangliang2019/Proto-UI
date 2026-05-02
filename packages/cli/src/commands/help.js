const HELP_TEXT = `proto-ui

Usage:
  proto-ui [--help|-h|help]
  proto-ui init [--root-dir <dir>] [--styles-dir <dir>] [--no-styles] [--no-interactive] [--yes|-y]
  proto-ui add <host> <component> [--root-dir <dir>] [--no-install] [--no-interactive]

Core commands:
  init              Create ./proto-ui, write config, and optionally generate style preset files
  add               Install adapter/prototype packages and generate component facade exports

Legacy style commands (still supported):
  proto-ui shadcn --styles-dir ./src/styles
  proto-ui tokens --input ./packages/prototypes --out ./src/styles/prototype-tokens.generated.css
  proto-ui tailwindcss --out ./src/styles/tailwindcss.css
  proto-ui theme shadcn --out ./src/styles/shadcn-theme.css

Examples:
  proto-ui init
  proto-ui init --no-styles
  proto-ui add react shadcn-button
  proto-ui add wc shadcn-button --no-install
`;

const COMMAND_HELP = {
  init: `proto-ui init

Usage:
  proto-ui init [--root-dir <dir>] [--styles-dir <dir>] [--no-styles] [--no-tailwind] [--no-interactive] [--yes|-y]

Behavior:
  - creates ./proto-ui by default
  - writes proto-ui/config.json
  - creates proto-ui/components, proto-ui/adapters, proto-ui/prototypes
  - generates style preset files unless disabled

Options:
  --root-dir <dir>        Custom Proto UI workspace root (default: ./proto-ui)
  --styles-dir <dir>      Where style preset files are written (default: ./src/styles)
  --no-styles             Skip style preset generation
  --no-tailwind           Alias of --no-styles
  --no-interactive        Never prompt
  --yes, -y               Accept defaults without prompting
`,
  add: `proto-ui add

Usage:
  proto-ui add <host> <component> [--root-dir <dir>] [--no-install] [--no-interactive]

Examples:
  proto-ui add react shadcn-button
  proto-ui add vue shadcn-button
  proto-ui add wc shadcn-button --no-install

Behavior:
  - reads proto-ui/config.json
  - checks host runtime requirements
  - installs Proto UI adapter/prototype packages unless --no-install is used
  - generates proto-ui/components/<host>/index.ts
  - updates proto-ui/components/index.ts
`,
};

export function printHelp() {
  console.log(HELP_TEXT);
}

export function printCommandHelp(command) {
  const text = COMMAND_HELP[command];
  if (!text) {
    printHelp();
    return;
  }
  console.log(text);
}
