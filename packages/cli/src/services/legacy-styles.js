export const STYLE_COMMANDS = new Set(['tokens', 'tailwindcss', 'theme']);
export const STYLE_PRESET_NAMES = new Set(['shadcn']);

export async function runLegacyStyleCommand(argv) {
  const legacy = await import('../legacy/cli.mjs');
  await legacy.run(argv);
}
