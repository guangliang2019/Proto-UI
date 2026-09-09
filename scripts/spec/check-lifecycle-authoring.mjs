#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { validateSpecEntity } from '@proto.ui/spec-schema';
import { checkSpecLifecycleAuthoring } from '@proto.ui/spec-engine';

const root = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const args = process.argv.slice(2).filter((arg) => arg !== '--');
if (args.length !== 2 || args[0] !== '--base')
  throw new Error('Usage: pnpm check:spec-authoring -- --base <commit>');
const git = (args) =>
  execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 1 << 26 });
const base = git(['rev-parse', '--verify', '--end-of-options', `${args[1]}^{commit}`]).trim();
const paths = git(['diff', '--name-only', '--diff-filter=ACMR', '-z', base, '--', 'spec'])
  .split('\0')
  .filter((file) =>
    /^spec\/(contracts|prototypes|modules|adapters|decisions|host-caps|tests|versions|knowledge)\/.+\.ya?ml$/.test(
      file
    )
  );
if (paths.length === 0) {
  console.log(`[spec-authoring] No changed entity files against ${base}`);
  process.exit(0);
}
// Match by identity, so moving a legacy entity does not invent a new lifecycle.
const previous = new Map();
for (const file of git(['ls-tree', '-r', '--name-only', base, '--', 'spec'])
  .split('\n')
  .filter((file) =>
    /^spec\/(contracts|prototypes|modules|adapters|decisions|host-caps|tests|versions|knowledge)\/.+\.ya?ml$/.test(
      file
    )
  )) {
  const entity = validateSpecEntity(parse(git(['show', `${base}:${file}`])));
  previous.set(entity.id, entity);
}
const issues = paths.flatMap((file) => {
  const entity = validateSpecEntity(parse(readFileSync(path.join(root, file), 'utf8')));
  return checkSpecLifecycleAuthoring(previous.get(entity.id), entity).map(
    (issue) => `${file}: ${issue}`
  );
});
if (issues.length) {
  issues.forEach((issue) => console.error(`[spec-authoring] ${issue}`));
  process.exitCode = 1;
} else console.log(`[spec-authoring] ${paths.length} changed entity files checked against ${base}`);
