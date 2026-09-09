// @vitest-environment node

import { spawn, type ChildProcess } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { createServer } from 'node:net';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { launchBrowser } from '../../www/src/content/docs/zh-cn/browser-harness';

type Browser = Awaited<ReturnType<typeof launchBrowser>>;
let browser: Browser;
let server: ChildProcess | undefined;
let baseUrl = '';
let output = '';
const contractId = 'C-A11Y-PART-RELATIONSHIP-0001';
const testId = 'T-A11Y-PART-RELATIONSHIP-0001';
const version = '0.3.0-alpha.0';

beforeAll(async () => {
  baseUrl = process.env.PROTO_UI_WORKSPACE_BASE_URL ?? '';
  if (!baseUrl) {
    const port = await new Promise<number>((resolve, reject) => {
      const probe = createServer();
      probe.on('error', reject);
      probe.listen(0, '127.0.0.1', () => {
        const address = probe.address();
        if (!address || typeof address === 'string')
          return reject(new Error('No workspace test port'));
        probe.close((error) => (error ? reject(error) : resolve(address.port)));
      });
    });
    baseUrl = `http://127.0.0.1:${port}`;
    server = spawn(
      process.platform === 'win32' ? 'corepack.cmd' : 'corepack',
      [
        'pnpm@10.32.1',
        '--filter',
        'apps-workspace',
        'dev',
        '--host',
        '127.0.0.1',
        '--port',
        String(port),
        '--strictPort',
      ],
      {
        cwd: process.cwd(),
        env: process.env,
        detached: process.platform !== 'win32',
        shell: process.platform === 'win32',
        stdio: ['ignore', 'pipe', 'pipe'],
      }
    );
    const record = (chunk: Buffer) => {
      output = (output + chunk.toString()).slice(-20000);
    };
    server.stdout?.on('data', record);
    server.stderr?.on('data', record);
  }
  const deadline = Date.now() + 90_000;
  while (true) {
    if (server?.exitCode != null) throw new Error(`Workspace exited: ${output}`);
    try {
      if ((await fetch(baseUrl, { signal: AbortSignal.timeout(1000) })).ok) break;
    } catch {
      /* Starting. */
    }
    if (Date.now() > deadline) throw new Error(`Workspace did not start: ${output}`);
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  browser = await launchBrowser();
}, 120_000);

afterAll(async () => {
  await browser?.close();
  if (!server?.pid || server.exitCode !== null) return;
  if (process.platform === 'win32') {
    await new Promise<void>((resolve) => {
      const killer = spawn('taskkill', ['/PID', String(server!.pid), '/T', '/F']);
      killer.once('exit', () => resolve());
      killer.once('error', () => resolve());
    });
  } else {
    process.kill(-server.pid, 'SIGTERM');
    await Promise.race([
      new Promise((resolve) => server!.once('exit', resolve)),
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);
    if (server.exitCode === null) process.kill(-server.pid, 'SIGKILL');
  }
}, 60_000);

describe.sequential('Workspace lifecycle review projection', () => {
  for (const width of [1440, 390]) {
    it(`shows the actual remain-draft slice and version boundaries at ${width}px`, async () => {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      try {
        await page.goto(`${baseUrl}/#/entities/${testId}`);
        const panel = page.locator('.lifecycle-panel');
        await panel.locator(`[data-lifecycle-entity="${testId}"]`).waitFor();
        expect(await panel.innerText()).toContain('保持草案');
        expect(await panel.innerText()).toContain('六项 required implementation 均仍为 planned');
        expect(await panel.innerText()).toContain('不等于测试执行结果或稳定性批准');
        expect(await panel.locator('dd').first().innerText()).toMatch(/^2 \/ \d+$/);
        const screenshotDir = process.env.PROTO_UI_LIFECYCLE_SCREENSHOT_DIR;
        if (screenshotDir) {
          await mkdir(screenshotDir, { recursive: true });
          await panel.screenshot({ path: path.join(screenshotDir, `lifecycle-zh-${width}.png`) });
        }
        await page.getByRole('button', { name: 'English', exact: true }).click();
        expect(await panel.innerText()).toContain('Remain draft');
        await panel.locator('summary').click();
        const gaps = await panel.locator('details li').allTextContents();
        expect(gaps.filter((gap) => gap.endsWith(' is planned.'))).toHaveLength(6);
        await panel.locator('summary').click();
        if (screenshotDir)
          await panel.screenshot({ path: path.join(screenshotDir, `lifecycle-en-${width}.png`) });
        await panel
          .getByRole('button', { name: `${contractId}-Q-IMPLEMENTATION`, exact: true })
          .click();
        await panel.locator(`[data-lifecycle-entity="${contractId}"]`).waitFor();
        expect(await page.locator('.entity-panel .block-targets').innerText()).toContain(
          'Activation:'
        );
        expect(await page.locator('.entity-panel .block-targets').innerText()).toContain(
          'Implementation:'
        );
        await page.getByRole('combobox', { name: 'To', exact: true }).selectOption('0.2.0');
        await expect.poll(() => panel.locator('dd').first().innerText()).toMatch(/^0 \/ \d+$/);
        expect(await panel.innerText()).not.toContain('Remain draft');
        await page.getByRole('combobox', { name: 'To', exact: true }).selectOption(version);
        await expect.poll(() => panel.locator('dd').first().innerText()).toMatch(/^2 \/ \d+$/);
        expect(await panel.innerText()).toContain('Remain draft');
        expect(await panel.evaluate((el) => el.scrollWidth - el.clientWidth)).toBeLessThanOrEqual(
          0
        );
        expect(errors).toEqual([]);
      } finally {
        await context.close();
      }
    }, 60_000);
  }

  it('does not display a valid disposition when report input is rejected', async () => {
    const context = await browser.newContext();
    await context.route('**/spec-workspace.json', async (route) => {
      const response = await route.fetch();
      const data = await response.json();
      data.lifecyclePlans[version] = null;
      data.issues.push({ message: 'Invalid lifecycle disposition evidence (fixture)' });
      await route.fulfill({ response, json: data });
    });
    const page = await context.newPage();
    try {
      await page.goto(`${baseUrl}/#/entities/${testId}`);
      const panel = page.locator('.lifecycle-panel');
      await panel.waitFor();
      expect(await panel.innerText()).toContain('生命周期报告不可用');
      expect(await panel.locator('[data-lifecycle-entity]').count()).toBe(0);
      expect(await page.locator('.issues-panel').innerText()).toContain(
        'Invalid lifecycle disposition evidence'
      );
    } finally {
      await context.close();
    }
  }, 60_000);
});
