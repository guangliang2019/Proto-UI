import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { ROOT_DIR, getAllPackages } from './lib.mjs';

const REPO_URL = 'https://github.com/guangliang2019/Prototype-UI';
const REPO_GIT_URL = 'git+https://github.com/guangliang2019/Prototype-UI.git';
const BUGS_URL = 'https://github.com/guangliang2019/Prototype-UI/issues';
const RELEASE_VERSION = '0.0.1';

const PACKAGE_RULES = {
  '@proto.ui/core': {
    description: 'Proto UI core syntax and protocol primitives.',
    kind: 'infrastructure',
    purpose:
      'Provides the core authoring syntax, protocol primitives, and shared contracts used across Proto UI packages.',
    role: 'Core package for defining prototypes, handles, template primitives, and protocol-facing developer APIs.',
  },
  '@proto.ui/runtime': {
    description: 'Proto UI runtime that executes prototypes under the Proto UI contracts.',
    kind: 'infrastructure',
    purpose:
      'Implements the runtime execution flow that adapters can host under the Proto UI contracts.',
    role: 'Runtime package that coordinates setup, rendering, lifecycle, module orchestration, and host execution boundaries.',
  },
  '@proto.ui/types': {
    description: 'Shared type definitions for Proto UI packages.',
    kind: 'infrastructure',
    purpose:
      'Provides the unified type definitions shared by the rest of the Proto UI package graph.',
    role: 'Type foundation package used by core, runtime, modules, adapters, and prototype libraries.',
  },
  '@proto.ui/module-base': {
    description: 'Base package for building Proto UI modules.',
    kind: 'module-base',
    capability: 'module foundation',
    purpose:
      'Provides the base template, shared capabilities, and development utilities for building Proto UI modules.',
    role: 'Module foundation package used to implement adapter-facing modules in a consistent way.',
  },
  '@proto.ui/adapter-base': {
    description: 'Base package for building Proto UI adapters.',
    kind: 'adapter-base',
    target: 'custom adapter hosts',
    purpose:
      'Provides the base template, shared host wiring, and common runtime bridges for building Proto UI adapters.',
    role: 'Adapter foundation package used to translate Proto UI contracts into concrete host integrations.',
  },
  '@proto.ui/module-anatomy': moduleRule('anatomy capability'),
  '@proto.ui/module-as-trigger': moduleRule('as-trigger capability'),
  '@proto.ui/module-context': moduleRule('context capability'),
  '@proto.ui/module-event': moduleRule('event capability'),
  '@proto.ui/module-expose': moduleRule('expose capability'),
  '@proto.ui/module-expose-state': moduleRule('state expose capability'),
  '@proto.ui/module-expose-state-web': moduleRule('web state expose capability'),
  '@proto.ui/module-feedback': moduleRule('feedback capability'),
  '@proto.ui/module-focus': moduleRule('focus capability'),
  '@proto.ui/module-overlay': moduleRule('overlay capability'),
  '@proto.ui/module-props': moduleRule('props capability'),
  '@proto.ui/module-rule': moduleRule('rule capability'),
  '@proto.ui/module-rule-expose-state-web': moduleRule('rule-based web state expose capability'),
  '@proto.ui/module-rule-meta': moduleRule('rule metadata capability'),
  '@proto.ui/module-state': moduleRule('state capability'),
  '@proto.ui/module-state-accessibility': moduleRule('state accessibility capability'),
  '@proto.ui/module-state-interaction': moduleRule('state interaction capability'),
  '@proto.ui/module-test-sys': moduleRule('test system capability'),
  '@proto.ui/adapter-react': adapterRule('React'),
  '@proto.ui/adapter-vue': adapterRule('Vue'),
  '@proto.ui/adapter-web-component': adapterRule('Web Components'),
  '@proto.ui/prototypes-base': {
    description: 'Base Proto UI prototype library for reusable interaction prototypes.',
    kind: 'prototype-lib',
    style: 'base',
    purpose:
      'Provides the base Proto UI prototype library and reusable interaction prototypes that work with Proto UI adapters.',
    role: 'Prototype library package intended to be consumed together with Proto UI adapters.',
  },
  '@proto.ui/prototypes-shadcn': {
    description: 'shadcn-style Proto UI prototype library for adapter-driven components.',
    kind: 'prototype-lib',
    style: 'shadcn-style',
    purpose:
      'Provides a shadcn-style Proto UI prototype library that works with Proto UI adapters.',
    role: 'Prototype library package intended to be consumed together with Proto UI adapters.',
  },
};

const rootPackage = JSON.parse(readFileSync(join(ROOT_DIR, 'package.json'), 'utf8'));
const packages = getAllPackages().filter((pkg) => pkg.relDir !== 'packages/legacy/rule');

for (const pkg of packages) {
  const rule = PACKAGE_RULES[pkg.name];
  if (!rule) {
    throw new Error(`No metadata rule defined for ${pkg.name}`);
  }

  const nextManifest = {
    ...pkg.manifest,
    version: RELEASE_VERSION,
    private: false,
    description: rule.description,
    license: 'MIT',
    homepage: `${REPO_URL}/tree/main/${pkg.relDir}`,
    repository: {
      type: 'git',
      url: REPO_GIT_URL,
      directory: pkg.relDir,
    },
    bugs: {
      url: BUGS_URL,
    },
    publishConfig: {
      access: 'public',
      ...(pkg.manifest.publishConfig ?? {}),
    },
    keywords: buildKeywords(pkg, rule),
  };

  writeFileSync(pkg.manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);
  writeFileSync(join(pkg.dir, 'README.md'), buildReadme(pkg, rule));
}

rootPackage.scripts = {
  ...rootPackage.scripts,
  'release:sync-metadata': 'node scripts/release/sync-metadata.mjs',
};
writeFileSync(join(ROOT_DIR, 'package.json'), `${JSON.stringify(rootPackage, null, 2)}\n`);

function moduleRule(capability) {
  return {
    description: `Proto UI module that provides ${capability} for adapters.`,
    kind: 'module',
    capability,
    purpose: `Provides ${capability} to adapters running Proto UI prototypes.`,
    role: 'Adapter-facing module package used by the Proto UI runtime and adapter layer.',
  };
}

function adapterRule(target) {
  return {
    description: `Translates Proto UI prototypes into ${target} component functions for use with Proto UI adapters.`,
    kind: 'adapter',
    target,
    purpose: `Translates Proto UI prototypes into ${target} component functions that run through the Proto UI adapter contracts.`,
    role: 'Adapter package intended to be used together with Proto UI prototypes and the shared runtime stack.',
  };
}

function buildKeywords(pkg, rule) {
  const keywords = new Set(['proto-ui']);
  for (const token of pkg.name.replace('@', '').split(/[/.-]/g)) {
    if (token) keywords.add(token);
  }
  if (rule.kind === 'module' || rule.kind === 'module-base') keywords.add('module');
  if (rule.kind === 'adapter' || rule.kind === 'adapter-base') keywords.add('adapter');
  if (rule.kind === 'prototype-lib') keywords.add('prototype-library');
  if (rule.target) keywords.add(String(rule.target).toLowerCase().replace(/\s+/g, '-'));
  if (rule.style) keywords.add(String(rule.style).toLowerCase().replace(/\s+/g, '-'));
  return Array.from(keywords);
}

function buildReadme(pkg, rule) {
  const installName = pkg.name;
  const sourceEntries = listTopLevelSourceEntries(pkg.dir);
  const related =
    pkg.internalDeps.length > 0
      ? pkg.internalDeps.map((dep) => `- \`${dep}\``).join('\n')
      : '- None';

  return `# ${pkg.name}

${rule.description}

## Purpose

${rule.purpose}

## Package Role

${rule.role}

## Install

\`\`\`bash
npm install ${installName}@${RELEASE_VERSION}
\`\`\`

## Internal Structure

${sourceEntries}

## Related Internal Packages

${related}

## License

MIT
`;
}

function listTopLevelSourceEntries(dir) {
  const srcDir = join(dir, 'src');
  try {
    const entries = readdirSync(srcDir, { withFileTypes: true })
      .map((entry) => {
        const suffix = entry.isDirectory() ? '/' : '';
        return `- \`src/${entry.name}${suffix}\``;
      })
      .sort();
    if (entries.length === 0) return '- Source layout is intentionally minimal.';
    return entries.join('\n');
  } catch {
    return '- Source files are emitted from the package build script.';
  }
}
