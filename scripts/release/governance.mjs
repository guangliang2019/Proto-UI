import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = resolve(__dirname, '..', '..');
const GOVERNANCE_PATH = join(ROOT_DIR, 'internal', 'governance', 'launch-package-governance.json');

const CANDIDATE_STATUS = new Set(['approved', 'pending', 'deferred']);

export function loadLaunchPackageGovernance() {
  const payload = JSON.parse(readFileSync(GOVERNANCE_PATH, 'utf8'));
  return payload;
}

export function getLaunchProfilePackageNames(governance, options = {}) {
  const { includeApprovedCandidates = false } = options;
  const names = new Set(governance.launchCommitmentPackages ?? []);

  if (includeApprovedCandidates) {
    for (const candidate of governance.candidatePackages ?? []) {
      if (candidate.status === 'approved' && candidate.name) {
        names.add(candidate.name);
      }
    }
  }

  return names;
}

export function collectLaunchGovernanceDiagnostics(packages, governance) {
  const workspaceNames = new Set(packages.map((pkg) => pkg.name));
  const registrationOrder = [];
  const duplicateEntries = [];
  const unknownCandidateStatuses = [];
  const candidatePackages = governance.candidatePackages ?? [];
  const approvedCandidates = [];
  const pendingCandidates = [];
  const deferredCandidates = [];

  registerAll(governance.launchCommitmentPackages ?? [], 'launchCommitmentPackages');
  registerAll(
    governance.publicNonLaunchCommitmentPackages ?? [],
    'publicNonLaunchCommitmentPackages'
  );
  registerAll(
    governance.internalOrDependencyDirectedPackages ?? [],
    'internalOrDependencyDirectedPackages'
  );

  for (const candidate of candidatePackages) {
    if (!candidate || typeof candidate.name !== 'string' || candidate.name.length === 0) continue;
    const status = candidate.status ?? 'pending';
    registerAll([candidate.name], `candidatePackages:${status}`);
    if (!CANDIDATE_STATUS.has(status)) {
      unknownCandidateStatuses.push({
        name: candidate.name,
        status,
      });
      continue;
    }
    if (status === 'approved') approvedCandidates.push(candidate.name);
    else if (status === 'deferred') deferredCandidates.push(candidate.name);
    else pendingCandidates.push(candidate.name);
  }

  const knownNames = new Set(registrationOrder.map((item) => item.name));
  const unclassifiedWorkspacePackages = packages
    .filter((pkg) => !knownNames.has(pkg.name))
    .map((pkg) => pkg.name)
    .sort();

  const governanceEntriesNotInWorkspace = registrationOrder
    .map((item) => item.name)
    .filter((name) => !workspaceNames.has(name))
    .sort();

  const missingLaunchCommitmentPackages = (governance.launchCommitmentPackages ?? [])
    .filter((name) => !workspaceNames.has(name))
    .sort();

  const missingApprovedCandidates = approvedCandidates
    .filter((name) => !workspaceNames.has(name))
    .sort();

  const errors = [];
  if (duplicateEntries.length > 0) errors.push('duplicate package entries across governance tiers');
  if (unknownCandidateStatuses.length > 0) errors.push('unknown candidate package status');
  if (unclassifiedWorkspacePackages.length > 0)
    errors.push('workspace package missing from governance map');
  if (missingLaunchCommitmentPackages.length > 0)
    errors.push('launch commitment package missing in workspace');
  if (missingApprovedCandidates.length > 0)
    errors.push('approved candidate package missing in workspace');

  return {
    governancePath: GOVERNANCE_PATH,
    releaseLine: governance.releaseLine ?? 'unknown',
    targetDate: governance.targetDate ?? null,
    cliLaunchDate: governance.cliLaunchDate ?? null,
    launchCommitmentPackages: [...(governance.launchCommitmentPackages ?? [])],
    approvedCandidates,
    pendingCandidates,
    deferredCandidates,
    unknownCandidateStatuses,
    duplicateEntries,
    unclassifiedWorkspacePackages,
    missingLaunchCommitmentPackages,
    missingApprovedCandidates,
    governanceEntriesNotInWorkspace,
    errors,
  };

  function registerAll(names, tier) {
    for (const name of names) {
      if (typeof name !== 'string' || name.length === 0) continue;
      const seen = registrationOrder.find((item) => item.name === name);
      if (seen) {
        duplicateEntries.push({
          name,
          tiers: [seen.tier, tier],
        });
      } else {
        registrationOrder.push({ name, tier });
      }
    }
  }
}
