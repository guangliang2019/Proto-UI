import {
  getAllPackages,
  parseArgs,
  recommendedPackages,
  selectPackages,
  topoSortPackages,
} from './lib.mjs';

function printHelp() {
  console.log(`Usage: node scripts/release/scan.mjs [options]

Options:
  --json             Output machine-readable JSON
  --include-legacy   Include packages under packages/legacy
  --include-test     Include test-only packages such as module-test-sys
  --only <list>      Comma-separated package names or package paths
`);
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const packages = getAllPackages();
const selected = selectPackages(packages, args);
const ordered = topoSortPackages(selected);
const recommended = recommendedPackages(selected);

const payload = {
  packageCount: packages.length,
  selectedCount: selected.length,
  recommendedCount: recommended.length,
  selected: ordered.map(toSummary),
  blocked: ordered.filter((pkg) => pkg.issues.length > 0).map(toSummary),
  recommendedPublishOrder: topoSortPackages(recommended).map((pkg) => pkg.name),
};

if (args.json) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log(`Discovered ${packages.length} packages under /packages`);
console.log(`Selected ${selected.length} packages for release planning`);
console.log(`Recommended default publish set: ${recommended.length} packages`);
console.log('');
console.log('Recommended publish order:');
for (const name of payload.recommendedPublishOrder) {
  console.log(`- ${name}`);
}

console.log('');
console.log('Package status:');
for (const item of payload.selected) {
  const flags = [];
  if (item.isLegacy) flags.push('legacy');
  if (item.isTestOnly) flags.push('test-only');
  flags.push(item.sourceExport ? 'source-export' : 'dist-export');
  console.log(`- ${item.name} (${item.relDir}) [${flags.join(', ')}]`);
  if (item.issues.length > 0) {
    console.log(`  issues: ${item.issues.join('; ')}`);
  } else {
    console.log('  issues: none');
  }
}

function toSummary(pkg) {
  return {
    name: pkg.name,
    relDir: pkg.relDir,
    version: pkg.version,
    isLegacy: pkg.isLegacy,
    isTestOnly: pkg.isTestOnly,
    sourceExport: pkg.sourceExport,
    internalDeps: pkg.internalDeps,
    issues: pkg.issues,
  };
}
