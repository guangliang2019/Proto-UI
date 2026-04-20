#!/usr/bin/env node
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const distEntry = path.join(dir, '../dist/index.js');
const srcEntry = path.join(dir, '../src/cli.mjs');
const entryUrl = pathToFileURL(existsSync(distEntry) ? distEntry : srcEntry).href;

const { run } = await import(entryUrl);

const argv = process.argv.slice(2);

(async () => {
  try {
    await run(argv);
    process.exitCode = 0;
  } catch (err) {
    console.error(err?.stack || err?.message || err);
    process.exitCode = 1;
  }
})();
