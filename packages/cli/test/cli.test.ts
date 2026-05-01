import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const BIN_PATH = path.resolve(TEST_DIR, '../bin/proto-ui.js');

function runCli(cwd: string, args: string[]) {
  return spawnSync('node', [BIN_PATH, ...args], {
    cwd,
    encoding: 'utf8',
  });
}

async function createTempProject(name: string, packageJson: Record<string, unknown>) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), `${name}-`));
  await fs.writeFile(
    path.join(dir, 'package.json'),
    `${JSON.stringify(packageJson, null, 2)}\n`,
    'utf8'
  );
  return dir;
}

describe('@proto.ui/cli', () => {
  it('prints the new help text', () => {
    const result = runCli(process.cwd(), ['--help']);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('proto-ui init');
    expect(result.stdout).toContain('proto-ui add <host> <component>');
    expect(result.stdout).toContain('Legacy style commands');

    const addHelp = runCli(process.cwd(), ['add', '--help']);
    expect(addHelp.status).toBe(0);
    expect(addHelp.stdout).toContain('proto-ui add <host> <component>');
    expect(addHelp.stdout).toContain('generates proto-ui/components/<host>/index.ts');
  });

  it('initializes proto-ui workspace and default style files', async () => {
    const cwd = await createTempProject('pui-cli-init', {
      name: 'pui-cli-init',
      private: true,
    });

    const result = runCli(cwd, ['init', '--no-interactive']);
    expect(result.status).toBe(0);

    await expect(fs.stat(path.join(cwd, 'proto-ui/config.json'))).resolves.toBeTruthy();
    await expect(fs.stat(path.join(cwd, 'proto-ui/components'))).resolves.toBeTruthy();
    await expect(
      fs.stat(path.join(cwd, 'src/styles/prototype-tokens.generated.css'))
    ).resolves.toBeTruthy();
    await expect(fs.stat(path.join(cwd, 'src/styles/shadcn-theme.css'))).resolves.toBeTruthy();
    await expect(fs.stat(path.join(cwd, 'src/styles/tailwindcss.css'))).resolves.toBeTruthy();
  });

  it('adds a React facade without installing packages when --no-install is used', async () => {
    const cwd = await createTempProject('pui-cli-add', {
      name: 'pui-cli-add',
      private: true,
      dependencies: {
        react: '^19.0.0',
      },
    });

    expect(runCli(cwd, ['init', '--no-interactive', '--no-styles']).status).toBe(0);
    const result = runCli(cwd, ['add', 'react', 'shadcn-button', '--no-install']);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('@proto.ui/adapter-react');
    expect(result.stdout).toContain('@proto.ui/prototypes-shadcn');

    const reactIndex = await fs.readFile(
      path.join(cwd, 'proto-ui/components/react/index.ts'),
      'utf8'
    );
    const rootIndex = await fs.readFile(path.join(cwd, 'proto-ui/components/index.ts'), 'utf8');
    const config = JSON.parse(await fs.readFile(path.join(cwd, 'proto-ui/config.json'), 'utf8'));

    expect(reactIndex).toContain(`createReactAdapter`);
    expect(reactIndex).toContain(`shadcnButton`);
    expect(reactIndex).toContain(`export const Button = adapt(shadcnButton);`);
    expect(rootIndex).toContain(`export { Button as ReactButton } from './react';`);
    expect(config.components.react).toEqual(['shadcn-button']);
  });

  it('adds a compound Web Component facade from base prototypes', async () => {
    const cwd = await createTempProject('pui-cli-add-wc', {
      name: 'pui-cli-add-wc',
      private: true,
    });

    expect(runCli(cwd, ['init', '--no-interactive', '--no-styles']).status).toBe(0);
    const result = runCli(cwd, ['add', 'wc', 'base-dialog', '--no-install']);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('@proto.ui/adapter-web-component');
    expect(result.stdout).toContain('@proto.ui/prototypes-base');

    const wcIndex = await fs.readFile(path.join(cwd, 'proto-ui/components/wc/index.ts'), 'utf8');
    const rootIndex = await fs.readFile(path.join(cwd, 'proto-ui/components/index.ts'), 'utf8');
    const config = JSON.parse(await fs.readFile(path.join(cwd, 'proto-ui/config.json'), 'utf8'));

    expect(wcIndex).toContain(`AdaptToWebComponent`);
    expect(wcIndex).toContain(`dialogRoot`);
    expect(wcIndex).toContain(`export const BaseDialogRootElement = AdaptToWebComponent`);
    expect(wcIndex).toContain(`registerAs: 'proto-ui-base-dialog-root'`);
    expect(rootIndex).toContain(`export { BaseDialogRootElement } from './wc';`);
    expect(config.components.wc).toEqual(['base-dialog']);
  });

  it('fails fast when the required React runtime is missing', async () => {
    const cwd = await createTempProject('pui-cli-missing-runtime', {
      name: 'pui-cli-missing-runtime',
      private: true,
    });

    expect(runCli(cwd, ['init', '--no-interactive', '--no-styles']).status).toBe(0);
    const result = runCli(cwd, ['add', 'react', 'shadcn-button', '--no-install']);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('React runtime is required');
    expect(result.stderr).toContain('react-dom');
  });
});
