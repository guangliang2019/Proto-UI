import { mkdirSync } from 'node:fs';
import {
  buildPrerequisitePackages,
  ROOT_DIR,
  ensureCleanDir,
  getAllPackages,
  parseArgs,
  selectPackages,
  stagePackage,
  topoSortPackages,
} from './lib.mjs';

function printHelp() {
  console.log(`Usage: node scripts/release/publish.mjs [options]

Options:
  --version <semver>  Override package version for this release batch
  --dry-run           Run npm publish --dry-run against staged packages
  --publish           Run npm publish for real
  --tag <tag>         npm dist-tag, defaults to latest
  --otp <code>        npm one-time password for accounts requiring 2FA
  --registry <url>    Custom npm registry
  --access <mode>     npm access, defaults to public
  --include-legacy    Include packages under packages/legacy
  --include-test      Include test-only packages such as module-test-sys
  --only <list>       Comma-separated package names or package paths
  --out-dir <path>    Staging directory, defaults to .codex/npm-release
`);
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

if (!args.publish && !args.dryRun) {
  args.dryRun = true;
}

const packages = getAllPackages();
const selected = selectPackages(packages, args);
const ordered = topoSortPackages(selected);

if (ordered.length === 0) {
  console.error('No packages selected.');
  process.exit(1);
}

if (
  args.publish &&
  !args.version &&
  ordered.some((pkg) => !pkg.version || pkg.version === '0.0.0')
) {
  console.error('Refusing to publish with default 0.0.0 versions. Pass --version x.y.z.');
  process.exit(1);
}

const prerequisiteResults = buildPrerequisitePackages(ordered);
const failedPrerequisites = prerequisiteResults.filter((result) => result.code !== 0);
if (failedPrerequisites.length > 0) {
  console.error('Failed to build prerequisite packages before staging:');
  for (const result of failedPrerequisites) {
    console.error(`- ${result.name}`);
    for (const line of result.diagnostics.slice(0, 8)) {
      console.error(`  ${line}`);
    }
  }
  process.exit(1);
}

mkdirSync(args.outDir, { recursive: true });
ensureCleanDir(args.outDir);

const results = [];
for (const pkg of ordered) {
  const result = stagePackage(pkg, args);
  results.push(result);
}

console.log(`Staged ${results.length} packages into ${args.outDir}`);
console.log('');

if (prerequisiteResults.length > 0) {
  console.log('Prerequisite builds:');
  for (const result of prerequisiteResults) {
    console.log(`- ${result.name}: exit code ${result.code}`);
  }
  console.log('');
}

for (const result of results) {
  console.log(`- ${result.name}`);
  console.log(`  stage: ${result.stageDir}`);
  console.log(`  build exit code: ${result.buildCode}`);
  if (result.buildErrors.length > 0) {
    console.log(`  build diagnostics: ${result.buildErrors.length}`);
  } else {
    console.log('  build diagnostics: 0');
  }
  if (result.publishResult) {
    console.log(`  npm publish exit code: ${result.publishResult.code}`);
  }
}

const failedBuilds = results.filter((result) => result.buildCode !== 0);
if (failedBuilds.length > 0) {
  console.log('');
  console.log('Packages with TypeScript diagnostics:');
  for (const result of failedBuilds) {
    console.log(`- ${result.name}`);
    for (const line of result.buildErrors.slice(0, 8)) {
      console.log(`  ${line}`);
    }
  }
}

console.log('');
console.log(`Next step from repo root: cd ${ROOT_DIR}`);
