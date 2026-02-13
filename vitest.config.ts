import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

const PROTO_UI_PREFIX = '@proto-ui/';

function resolveProtoUiImport(id: string): string | null {
  if (!id.startsWith(PROTO_UI_PREFIX)) return null;

  const name = id.slice(PROTO_UI_PREFIX.length);
  const parts = name.split('/');
  const pkg = parts[0];
  const rest = parts.slice(1);

  let subdir: string;
  if (pkg.startsWith('modules.')) {
    subdir = path.join('modules', pkg.slice('modules.'.length));
  } else if (pkg.startsWith('adapters.')) {
    subdir = path.join('adapters', pkg.slice('adapters.'.length));
  } else if (pkg === 'rule') {
    subdir = path.join('legacy', 'rule');
  } else {
    subdir = pkg;
  }

  const base = path.resolve(__dirname, 'packages', subdir, 'src');
  const target = rest.length ? path.join(base, ...rest) : base;
  const index = path.join(target, 'index.ts');

  if (fs.existsSync(index)) return index;
  if (fs.existsSync(target)) return target;
  return null;
}

export default defineConfig({
  plugins: [
    {
      name: 'proto-ui-alias',
      resolveId(id) {
        return resolveProtoUiImport(id);
      },
    },
  ],
  test: {
    environment: 'happy-dom',
    include: [
      'packages/**/*.test.ts',
      'packages/**/test/**/*.test.ts',
      'internal/contracts/__tests__/**/*.test.ts',
    ],
  },
});
