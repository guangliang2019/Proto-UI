import { addComponentToConfig, loadCliConfig, saveCliConfig } from '../config/project-config.js';
import { getAdapter, normalizeHost } from '../registry/adapters.js';
import { getComponentEntry } from '../registry/components.js';
import { writeGeneratedIndexes } from '../services/codegen.js';
import { promptForComponent, promptForHost } from '../services/interactive.js';
import {
  detectPackageManager,
  formatInstallCommand,
  hasPackage,
  installPackages,
  readProjectPackageJson,
} from '../services/package-manager.js';
import { ensureRuntimePackages } from '../services/runtime-check.js';
import { isInteractiveDisabled, parseArgv } from '../utils/args.js';
import { relativeToCwd } from '../utils/fs.js';

export async function runAddCommand(argv) {
  const { options, positionals } = parseArgv(argv);
  const cwd = process.cwd();
  const interactive =
    !isInteractiveDisabled(options) && process.stdin.isTTY && process.stdout.isTTY;
  const rootDir = options['root-dir'];

  let [hostInput, componentInput] = positionals;
  if (!hostInput && interactive) hostInput = await promptForHost();
  if (!componentInput && interactive) componentInput = await promptForComponent();

  const host = normalizeHost(hostInput);
  if (!host) {
    throw new Error(
      hostInput
        ? `unsupported host "${hostInput}". supported: react, vue, wc`
        : 'missing host argument'
    );
  }

  const componentEntry = getComponentEntry(componentInput);
  if (!componentEntry) {
    throw new Error(
      componentInput ? `unsupported component "${componentInput}".` : 'missing component argument'
    );
  }

  const adapter = getAdapter(host);
  const { config, paths } = await loadCliConfig(cwd, rootDir);
  if (!config) {
    throw new Error(
      `missing Proto UI config at ${relativeToCwd(paths.configPath, cwd)}. Run "proto-ui init" first.`
    );
  }

  const projectPkg = await readProjectPackageJson(cwd);
  if (!projectPkg) {
    throw new Error(
      'missing package.json in current project root. "proto-ui add" must run inside a project.'
    );
  }

  const packageManager = await detectPackageManager(cwd);
  ensureRuntimePackages({ adapter, projectPkg, packageManager });

  const noInstall = options.install === false || options['no-install'] === true;
  const requiredPackages = [adapter.packageName, componentEntry.packageName].filter(
    (pkg, index, list) => list.indexOf(pkg) === index
  );
  const missingPackages = requiredPackages.filter((pkg) => !hasPackage(projectPkg, pkg));

  if (!noInstall && missingPackages.length > 0) {
    installPackages(packageManager, cwd, missingPackages);
    console.log(`[proto-ui] add: installed ${missingPackages.join(', ')} via ${packageManager}`);
  } else if (noInstall && missingPackages.length > 0) {
    console.log('[proto-ui] add: required Proto UI packages are not installed yet:');
    for (const pkg of missingPackages) {
      console.log(`  ${formatInstallCommand(packageManager, [pkg])}`);
    }
  }

  const nextConfig = addComponentToConfig(config, host, componentEntry.id, adapter.packageName);
  await saveCliConfig(cwd, nextConfig);
  await writeGeneratedIndexes(paths, nextConfig);

  console.log(
    `[proto-ui] add: generated ${relativeToCwd(paths.componentsDir, cwd)} for ${host}/${componentEntry.id}`
  );

  if (componentEntry.stylePreset === 'shadcn' && nextConfig.styles?.enabled === false) {
    console.log(
      '[proto-ui] add: note that this component expects the shadcn style preset, but styles are disabled in proto-ui/config.json'
    );
  }
}
