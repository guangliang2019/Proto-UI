import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { parse } from 'yaml';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const report = (args) =>
  spawnSync(process.execPath, ['--import', 'tsx', 'scripts/spec/lifecycle-report.mjs', ...args], {
    cwd: root,
    encoding: 'utf8',
    maxBuffer: 1 << 25,
  });
const ids = 'C-A11Y-PART-RELATIONSHIP-0001,T-A11Y-PART-RELATIONSHIP-0001';

test('release lifecycle CLI distinguishes scoped review from full-inventory completion', () => {
  const scoped = report(['--check', '--entities', ids, '--json']);
  assert.equal(scoped.status, 0, scoped.stderr);
  const data = JSON.parse(scoped.stdout);
  assert.equal(data.basis, 'current-catalog');
  assert.equal(data.summary.reviewedDrafts, 2);
  assert.ok(data.unreviewedEntities.length > 0);
  assert.equal(
    data.rows
      .filter((row) => ids.split(',').includes(row.entityId))
      .every((row) => row.status === 'draft'),
    true
  );
  const full = report(['--check']);
  assert.equal(full.status, 1);
  assert.match(full.stderr, /has no authored release disposition/);
  const wrongScope = report(['--check', '--entities', 'C-ABSENT-0001']);
  assert.equal(wrongScope.status, 1);
  assert.match(wrongScope.stderr, /outside the report scope/);
});

test('release lifecycle reports are reproducible and require a declared version', () => {
  const first = report(['--json']);
  const second = report(['--json']);
  assert.equal(first.status, 0, first.stderr);
  assert.equal(second.stdout, first.stdout);
  const unknown = report(['--version', '99.0.0']);
  assert.notEqual(unknown.status, 0);
  assert.match(unknown.stderr, /No V entity declares/);
});

test('release preparation and changed-entity CI invoke the lifecycle tools', () => {
  const rehearsal = readFileSync(new URL('../rehearse.mjs', import.meta.url), 'utf8');
  assert.match(rehearsal, /'release:lifecycle'/);
  assert.match(rehearsal, /lifecycle-review\.json/);
  const workflow = parse(
    readFileSync(new URL('../../../.github/workflows/ci.yml', import.meta.url), 'utf8')
  );
  const steps = workflow.jobs.test.steps;
  assert.equal(
    steps.find((step) => step.uses?.startsWith('actions/checkout')).with['fetch-depth'],
    0
  );
  const gate = steps.find((step) => step.name === 'Public documentation gate and repository tests');
  assert.match(gate.env.SPEC_AUTHORING_BASE, /pull_request\.base\.sha/);
  assert.match(gate.run, /check:spec-authoring -- --base/);
});
