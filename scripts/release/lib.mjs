import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
  copyFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT_DIR = resolve(__dirname, '..', '..');
const PACKAGES_DIR = join(ROOT_DIR, 'packages');
const ROOT_LICENSE = join(ROOT_DIR, 'LICENSE');
const ROOT_README = join(ROOT_DIR, 'README.md');

const DEFAULT_EXCLUDES = {
  legacy: true,
  test: false,
};

export function parseArgs(argv) {
  const args = {
    dryRun: false,
    json: false,
    includeLegacy: false,
    includeTest: false,
    checkBuild: false,
    publish: false,
    tag: 'latest',
    access: 'public',
    otp: undefined,
    outDir: join(tmpdir(), 'proto-ui-npm-release'),
    only: [],
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--') continue;
    else if (arg === '--dry-run') args.dryRun = true;
    else if (arg === '--json') args.json = true;
    else if (arg === '--include-legacy') args.includeLegacy = true;
    else if (arg === '--include-test') args.includeTest = true;
    else if (arg === '--check-build') args.checkBuild = true;
    else if (arg === '--publish') args.publish = true;
    else if (arg === '--version') args.version = argv[++i];
    else if (arg === '--tag') args.tag = argv[++i];
    else if (arg === '--access') args.access = argv[++i];
    else if (arg === '--otp') args.otp = argv[++i];
    else if (arg === '--registry') args.registry = argv[++i];
    else if (arg === '--out-dir') args.outDir = resolve(ROOT_DIR, argv[++i]);
    else if (arg === '--only')
      args.only = argv[++i]
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    else if (arg === '--help' || arg === '-h') args.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

export function getAllPackages() {
  const packageDirs = [];
  for (const scope of readdirSync(PACKAGES_DIR, { withFileTypes: true })) {
    if (!scope.isDirectory()) continue;
    const scopeDir = join(PACKAGES_DIR, scope.name);
    const directPackageJson = join(scopeDir, 'package.json');
    if (existsSync(directPackageJson)) {
      packageDirs.push(scopeDir);
      continue;
    }

    for (const child of readdirSync(scopeDir, { withFileTypes: true })) {
      if (!child.isDirectory()) continue;
      const childDir = join(scopeDir, child.name);
      if (existsSync(join(childDir, 'package.json'))) {
        packageDirs.push(childDir);
      }
    }
  }

  packageDirs.sort();

  const packages = packageDirs.map((dir) => {
    const manifestPath = join(dir, 'package.json');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    const relDir = relative(ROOT_DIR, dir).replaceAll('\\', '/');
    const exportsField = manifest.exports;
    const exportTargets = flattenExportTargets(exportsField);
    const hasSrcIndex = existsSync(join(dir, 'src', 'index.ts'));
    const hasDistIndex = existsSync(join(dir, 'dist', 'index.js'));
    const localReadme = ['README.md', 'README.mdx'].find((name) => existsSync(join(dir, name)));
    const dependencyMap = {
      ...manifest.dependencies,
      ...manifest.peerDependencies,
      ...manifest.optionalDependencies,
    };
    const workspaceDeps = Object.entries(dependencyMap)
      .filter(([, version]) => String(version).startsWith('workspace:'))
      .map(([name]) => name)
      .sort();
    const sourceExport = exportTargets.some(
      (target) => target.includes('/src/') || (target.endsWith('.ts') && !target.endsWith('.d.ts'))
    );
    const distExport = exportTargets.some(
      (target) => target.includes('/dist/') || target.endsWith('.js')
    );
    const isLegacy = relDir.startsWith('packages/legacy/');
    const isTestOnly = relDir.includes('/test-sys');
    const issues = [];

    if (manifest.private) issues.push('private=true');
    if (!manifest.version || manifest.version === '0.0.0')
      issues.push(`version=${manifest.version ?? 'missing'}`);
    if (!hasSrcIndex && !hasDistIndex) issues.push('missing index entry');
    if (!manifest.license) issues.push('missing license field');
    if (!localReadme) issues.push('missing package README');
    if (workspaceDeps.length > 0) issues.push(`workspace deps: ${workspaceDeps.length}`);
    if (sourceExport) issues.push('exports point to src/*.ts');

    return {
      dir,
      relDir,
      manifestPath,
      manifest,
      name: manifest.name,
      version: manifest.version,
      localReadme: localReadme ? join(dir, localReadme) : null,
      hasSrcIndex,
      hasDistIndex,
      sourceExport,
      distExport,
      isLegacy,
      isTestOnly,
      workspaceDeps,
      issues,
    };
  });

  const byName = new Map(packages.map((pkg) => [pkg.name, pkg]));
  for (const pkg of packages) {
    pkg.internalDeps = pkg.workspaceDeps.filter((dep) => byName.has(dep));
  }

  return packages;
}

export function selectPackages(packages, options = {}) {
  const { includeLegacy = false, includeTest = false, only = [] } = options;
  const onlySet = new Set(only);

  return packages.filter((pkg) => {
    if (onlySet.size > 0 && !onlySet.has(pkg.name) && !onlySet.has(pkg.relDir)) return false;
    if (!includeLegacy && DEFAULT_EXCLUDES.legacy && pkg.isLegacy) return false;
    if (!includeTest && DEFAULT_EXCLUDES.test && pkg.isTestOnly) return false;
    return true;
  });
}

export function topoSortPackages(packages) {
  const selectedNames = new Set(packages.map((pkg) => pkg.name));
  const indegree = new Map(packages.map((pkg) => [pkg.name, 0]));
  const outgoing = new Map(packages.map((pkg) => [pkg.name, []]));

  for (const pkg of packages) {
    for (const dep of pkg.internalDeps) {
      if (!selectedNames.has(dep)) continue;
      outgoing.get(dep).push(pkg.name);
      indegree.set(pkg.name, indegree.get(pkg.name) + 1);
    }
  }

  const queue = packages
    .filter((pkg) => indegree.get(pkg.name) === 0)
    .map((pkg) => pkg.name)
    .sort();
  const orderedNames = [];

  while (queue.length > 0) {
    const name = queue.shift();
    orderedNames.push(name);
    for (const next of outgoing.get(name)) {
      const nextDegree = indegree.get(next) - 1;
      indegree.set(next, nextDegree);
      if (nextDegree === 0) {
        queue.push(next);
        queue.sort();
      }
    }
  }

  if (orderedNames.length !== packages.length) {
    throw new Error('Package graph contains a cycle.');
  }

  const packageMap = new Map(packages.map((pkg) => [pkg.name, pkg]));
  return orderedNames.map((name) => packageMap.get(name));
}

export function recommendedPackages(packages) {
  return packages.filter((pkg) => !pkg.isLegacy);
}

export function buildPrerequisitePackages(packages) {
  const prerequisites = packages.filter(
    (pkg) => pkg.distExport && typeof pkg.manifest?.scripts?.build === 'string'
  );

  const results = [];
  for (const pkg of prerequisites) {
    const result = spawnSync('pnpm', ['--filter', pkg.name, 'build'], {
      cwd: ROOT_DIR,
      encoding: 'utf8',
    });
    const diagnostics = collectNonEmptyLines(`${result.stdout}\n${result.stderr}`);
    results.push({
      name: pkg.name,
      code: result.status ?? 0,
      diagnostics,
    });
  }

  return results;
}

export function ensureCleanDir(dir) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

export function stagePackage(pkg, options) {
  const {
    outDir,
    version,
    access = 'public',
    publish = false,
    dryRun = false,
    tag = 'latest',
    registry,
    otp,
  } = options;
  const stageDir = join(outDir, sanitizePackageName(pkg.name));
  const npmCacheDir = join(tmpdir(), 'proto-ui-npm-cache');
  ensureCleanDir(stageDir);
  mkdirSync(npmCacheDir, { recursive: true });

  const distDir = join(stageDir, 'dist');
  mkdirSync(distDir, { recursive: true });

  const entrySource = join(pkg.dir, 'src', 'index.ts');
  if (!existsSync(entrySource)) {
    throw new Error(`Cannot build ${pkg.name}: missing src/index.ts`);
  }

  const tscArgs = [
    'exec',
    'tsc',
    '--pretty',
    'false',
    '--declaration',
    '--emitDeclarationOnly',
    'false',
    '--allowJs',
    'true',
    '--rootDir',
    join(pkg.dir, 'src'),
    '--outDir',
    distDir,
    '--module',
    'ES2022',
    '--moduleResolution',
    'Bundler',
    '--target',
    'ES2022',
    entrySource,
  ];

  const buildResult = spawnSync('pnpm', tscArgs, {
    cwd: ROOT_DIR,
    encoding: 'utf8',
  });

  const buildErrors = collectNonEmptyLines(`${buildResult.stdout}\n${buildResult.stderr}`);
  const manifest = createPublishManifest(pkg, { version, access });
  writeFileSync(join(stageDir, 'package.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  writeSupportingFiles(pkg, stageDir);

  const binDir = join(pkg.dir, 'bin');
  if (existsSync(binDir)) {
    cpSync(binDir, join(stageDir, 'bin'), { recursive: true });
  }

  let publishResult = null;
  if (publish || dryRun) {
    const publishArgs = ['publish', '--access', access, '--tag', tag];
    if (dryRun) publishArgs.push('--dry-run');
    if (otp) publishArgs.push('--otp', otp);
    if (registry) publishArgs.push('--registry', registry);
    const result = spawnSync('npm', publishArgs, {
      cwd: stageDir,
      encoding: 'utf8',
      env: {
        ...process.env,
        npm_config_cache: npmCacheDir,
      },
    });
    publishResult = {
      code: result.status ?? 0,
      stdout: result.stdout,
      stderr: result.stderr,
      errors: collectNonEmptyLines(`${result.stdout}\n${result.stderr}`),
    };
    if (result.status !== 0) {
      throw new Error(`npm publish failed for ${pkg.name}\n${result.stderr || result.stdout}`);
    }
  }

  return {
    name: pkg.name,
    stageDir,
    buildCode: buildResult.status ?? 0,
    buildErrors,
    publishResult,
  };
}

export function createPublishManifest(pkg, options) {
  const { version, access } = options;
  const manifest = JSON.parse(JSON.stringify(pkg.manifest));

  delete manifest.private;
  delete manifest.devDependencies;
  delete manifest.scripts;

  manifest.version = version ?? manifest.version;
  manifest.license ??= readRootLicenseId();
  const files = ['dist', 'README.md', 'LICENSE'];
  if (manifest.bin && !files.includes('bin')) files.push('bin');
  manifest.files = files;
  manifest.publishConfig = {
    access,
    ...manifest.publishConfig,
  };

  rewriteManifestField(manifest, 'main');
  rewriteManifestField(manifest, 'module');
  rewriteManifestField(manifest, 'types');
  if (manifest.exports) {
    manifest.exports = rewriteExports(manifest.exports);
  } else {
    manifest.exports = {
      '.': {
        types: './dist/index.d.ts',
        default: './dist/index.js',
      },
    };
  }

  for (const field of ['dependencies', 'peerDependencies', 'optionalDependencies']) {
    if (!manifest[field]) continue;
    for (const [name, depVersion] of Object.entries(manifest[field])) {
      if (String(depVersion).startsWith('workspace:')) {
        manifest[field][name] = version ?? pkg.version;
      }
    }
  }

  return manifest;
}

function rewriteManifestField(manifest, field) {
  if (!manifest[field]) return;
  manifest[field] = rewritePath(manifest[field], field === 'types');
}

function rewriteExports(value) {
  if (typeof value === 'string') return rewritePath(value, value.endsWith('.d.ts'));
  if (Array.isArray(value)) return value.map((item) => rewriteExports(item));
  if (value && typeof value === 'object') {
    const next = {};
    for (const [key, entry] of Object.entries(value)) {
      next[key] = rewriteExports(entry);
    }
    return next;
  }
  return value;
}

function rewritePath(value, isTypes = false) {
  if (typeof value !== 'string') return value;
  let next = value;
  next = next.replace('./src/', './dist/');
  next = next.replace('./dist/src/', './dist/');
  if (next.endsWith('.ts')) {
    next = `${next.slice(0, -3)}${isTypes ? '.d.ts' : '.js'}`;
  }
  if (next.endsWith('/index.d.ts') || next.endsWith('/index.js')) return next;
  if (next.endsWith('/index')) return `${next}${isTypes ? '.d.ts' : '.js'}`;
  return next;
}

function flattenExportTargets(exportsField) {
  const targets = [];
  walk(exportsField);
  return targets;

  function walk(value) {
    if (!value) return;
    if (typeof value === 'string') {
      targets.push(value);
      return;
    }
    if (Array.isArray(value)) {
      for (const item of value) walk(item);
      return;
    }
    if (typeof value === 'object') {
      for (const item of Object.values(value)) walk(item);
    }
  }
}

function sanitizePackageName(name) {
  return name.replace('@', '').replaceAll('/', '__');
}

function writeSupportingFiles(pkg, stageDir) {
  if (pkg.localReadme) {
    copyFileSync(pkg.localReadme, join(stageDir, 'README.md'));
  } else if (existsSync(ROOT_README)) {
    writeFileSync(
      join(stageDir, 'README.md'),
      `# ${pkg.name}\n\nPublished from \`${pkg.relDir}\` in the Proto-UI monorepo.\n`
    );
  }

  if (existsSync(ROOT_LICENSE)) {
    copyFileSync(ROOT_LICENSE, join(stageDir, 'LICENSE'));
  }
}

function readRootLicenseId() {
  return 'MIT';
}

function collectNonEmptyLines(value) {
  return value
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0);
}
