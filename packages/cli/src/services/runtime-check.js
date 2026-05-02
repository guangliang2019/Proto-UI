import { formatInstallCommand } from './package-manager.js';

export function ensureRuntimePackages({ adapter, projectPkg, packageManager }) {
  const missing = adapter.runtimePackages.filter((pkg) => !hasProjectPackage(projectPkg, pkg));

  if (missing.length === 0) return;

  const installLine = formatInstallCommand(packageManager, runtimeInstallHint(adapter.id, missing));
  throw new Error(
    [
      `[proto-ui] ${adapter.label} runtime is required for adapter "${adapter.id}".`,
      '',
      'Missing dependency:',
      ...missing.map((pkg) => `  ${pkg}`),
      '',
      'Install it first:',
      `  ${installLine}`,
    ].join('\n')
  );
}

function hasProjectPackage(projectPkg, packageName) {
  return Boolean(
    projectPkg?.dependencies?.[packageName] ||
    projectPkg?.devDependencies?.[packageName] ||
    projectPkg?.peerDependencies?.[packageName] ||
    projectPkg?.optionalDependencies?.[packageName]
  );
}

function runtimeInstallHint(adapterId, missing) {
  if (adapterId === 'react' && missing.includes('react')) {
    return ['react', 'react-dom'];
  }
  return missing;
}
