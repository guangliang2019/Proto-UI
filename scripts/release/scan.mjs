import {
  getAllPackages,
  parseArgs,
  recommendedPackages,
  selectPackages,
  topoSortPackages,
} from './lib.mjs';
import { collectLaunchGovernanceDiagnostics, loadLaunchPackageGovernance } from './governance.mjs';

function printHelp() {
  console.log(`Usage: node scripts/release/scan.mjs [options]

Options:
  --json                        Output machine-readable JSON
  --profile <name>             workspace (default) or launch
  --include-approved-candidates
                                Include candidate packages marked approved
  --check-governance           Fail if governance map and workspace are out of sync
  --include-legacy             Include packages under packages/legacy (workspace profile only)
  --include-test               Include test-only packages such as module-test-sys
  --only <list>                Comma-separated package names or package paths
`);
}

const args = parseArgs(process.argv.slice(2));
if (args.help) {
  printHelp();
  process.exit(0);
}

const packages = getAllPackages();
const launchGovernance =
  args.profile === 'launch' || args.checkGovernance ? loadLaunchPackageGovernance() : null;
const governance = launchGovernance
  ? collectLaunchGovernanceDiagnostics(packages, launchGovernance)
  : null;

if (args.checkGovernance && governance && governance.errors.length > 0) {
  console.error('Launch governance check failed:');
  for (const error of governance.errors) {
    console.error(`- ${error}`);
  }
  if (governance.unclassifiedWorkspacePackages.length > 0) {
    console.error(`  unclassified: ${governance.unclassifiedWorkspacePackages.join(', ')}`);
  }
  if (governance.missingLaunchCommitmentPackages.length > 0) {
    console.error(
      `  missing launch commitment packages: ${governance.missingLaunchCommitmentPackages.join(', ')}`
    );
  }
  if (governance.missingApprovedCandidates.length > 0) {
    console.error(
      `  missing approved candidates: ${governance.missingApprovedCandidates.join(', ')}`
    );
  }
  process.exit(1);
}

const selected = selectPackages(packages, {
  ...args,
  launchGovernance,
});
const ordered = topoSortPackages(selected);
const recommended = recommendedPackages(selected);

const payload = {
  packageCount: packages.length,
  selectedCount: selected.length,
  recommendedCount: recommended.length,
  profile: args.profile,
  selected: ordered.map(toSummary),
  blocked: ordered.filter((pkg) => pkg.issues.length > 0).map(toSummary),
  recommendedPublishOrder: topoSortPackages(recommended).map((pkg) => pkg.name),
  governance,
};

if (args.json) {
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

console.log(`Discovered ${packages.length} packages under /packages`);
console.log(`Selected ${selected.length} packages for release planning`);
console.log(`Recommended default publish set: ${recommended.length} packages`);
if (governance) {
  console.log(`Governance release line: ${governance.releaseLine}`);
  console.log(`Approved candidates included: ${args.includeApprovedCandidates ? 'yes' : 'no'}`);
}
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
