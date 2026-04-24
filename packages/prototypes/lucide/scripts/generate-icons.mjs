#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(pkgDir, 'icons.config.json');
const iconDir = path.join(pkgDir, 'src', 'icons');
const shapeDir = path.join(pkgDir, 'src', 'shapes');

const output = {
  iconRegistry: path.join(pkgDir, 'src', 'icon', 'icons.generated.ts'),
  iconIndex: path.join(pkgDir, 'src', 'icons', 'index.generated.ts'),
  manifest: path.join(pkgDir, 'src', 'manifest.generated.ts'),
  snippets: path.join(pkgDir, 'src', 'snippets.generated.ts'),
  loaders: path.join(pkgDir, 'src', 'loaders.generated.ts'),
};

const SUPPORTED_TAGS = new Set([
  'path',
  'circle',
  'line',
  'rect',
  'polyline',
  'ellipse',
  'polygon',
]);

function toLiteral(value) {
  if (typeof value === 'number') return String(value);
  if (typeof value !== 'string') return JSON.stringify(value);
  if (/^-?\d+(\.\d+)?$/.test(value)) return String(Number(value));
  return JSON.stringify(value);
}

function toSvgPropKey(key) {
  return key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function normalizeAttrs(attrs) {
  const out = {};
  for (const [key, value] of Object.entries(attrs)) {
    out[toSvgPropKey(key)] = typeof value === 'string' ? value.trim() : value;
  }
  return out;
}

function attrsToObjectLiteral(attrs) {
  const entries = Object.entries(attrs);
  if (entries.length === 0) return '{}';
  return `{ ${entries.map(([key, value]) => `${key}: ${toLiteral(value)}`).join(', ')} }`;
}

function toPascalCase(value) {
  const chunks = value.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  return chunks.map((chunk) => chunk[0].toUpperCase() + chunk.slice(1)).join('');
}

function toConstCase(value) {
  return value
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toUpperCase();
}

function buildShapeFactoryBody(nodes, iconName) {
  const calls = [];
  for (const node of nodes) {
    const [tag, rawAttrs] = node;
    if (!SUPPORTED_TAGS.has(tag)) {
      throw new Error(
        `Icon '${iconName}' uses unsupported svg tag '${tag}'. Extend renderer.svg.* before generating this icon.`
      );
    }
    const attrs = normalizeAttrs(rawAttrs ?? {});
    calls.push(`svg.${tag}(${attrsToObjectLiteral(attrs)})`);
  }

  if (calls.length === 0) {
    throw new Error(`Icon '${iconName}' has no drawable nodes in lucide-static icon-nodes.json.`);
  }

  if (calls.length === 1) return calls[0];
  return `[\n    ${calls.join(',\n    ')},\n  ]`;
}

function createIconModuleSource(iconName, nodes) {
  const pascal = toPascalCase(iconName);
  const constant = toConstCase(iconName);
  const shapeFactoryName = `LUCIDE_${constant}_SHAPE_FACTORY`;
  const renderName = `renderLucide${pascal}Icon`;
  const asHookName = `asLucide${pascal}Icon`;
  const prototypeName = `lucide${pascal}Icon`;

  return `// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = ${JSON.stringify(iconName)} as const;
export const ${shapeFactoryName}: LucideShapeFactory = (svg) => ${buildShapeFactoryBody(nodes, iconName)};

export function ${renderName}(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, ${shapeFactoryName}, options);
}

const fixed = createLucideFixedIcon({
  asHookName: ${JSON.stringify(`as-lucide-${iconName}-icon`)},
  prototypeName: ${JSON.stringify(`lucide-${iconName}-icon`)},
  shapeFactory: ${shapeFactoryName},
});

export const ${asHookName} = fixed.asHook;
export const ${prototypeName} = fixed.prototype;
export default ${prototypeName};
`;
}

function createShapeModuleSource(iconName, nodes) {
  const constant = toConstCase(iconName);
  const shapeFactoryName = `LUCIDE_${constant}_SHAPE_FACTORY`;

  return `// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import type { LucideShapeFactory } from '../icon/contracts';

export const LUCIDE_ICON_NAME = ${JSON.stringify(iconName)} as const;
export const ${shapeFactoryName}: LucideShapeFactory = (svg) => ${buildShapeFactoryBody(nodes, iconName)};

export default ${shapeFactoryName};
`;
}

function createIconRegistrySource(iconNames) {
  const imports = iconNames
    .map((name) => {
      const constant = toConstCase(name);
      return `import { LUCIDE_${constant}_SHAPE_FACTORY } from '../icons/${name}';`;
    })
    .join('\n');

  const entries = iconNames
    .map((name) => {
      const constant = toConstCase(name);
      return `  ${JSON.stringify(name)}: LUCIDE_${constant}_SHAPE_FACTORY,`;
    })
    .join('\n');

  return `// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import type { LucideShapeFactory } from './contracts';
${imports}

export const LUCIDE_ICON_NAMES = [
${iconNames.map((name) => `  ${JSON.stringify(name)},`).join('\n')}
] as const;

export type LucideIconName = (typeof LUCIDE_ICON_NAMES)[number];

export function isLucideIconName(value: string): value is LucideIconName {
  return (LUCIDE_ICON_NAMES as readonly string[]).includes(value);
}

export const LUCIDE_ICON_REGISTRY: Record<LucideIconName, LucideShapeFactory> = {
${entries}
};
`;
}

function createIconIndexSource(iconNames) {
  const lines = iconNames.flatMap((name) => {
    const pascal = toPascalCase(name);
    const constant = toConstCase(name);
    return [
      `export { default as lucide${pascal}Icon, asLucide${pascal}Icon, renderLucide${pascal}Icon } from './${name}';`,
      `export { LUCIDE_ICON_NAME as LUCIDE_${constant}_ICON_NAME, LUCIDE_${constant}_SHAPE_FACTORY } from './${name}';`,
    ];
  });

  return `// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

${lines.join('\n')}
`;
}

function createManifestSource(iconNames) {
  const toEntryLiteral = (name) => {
    const pascal = toPascalCase(name);
    return `{
    name: ${JSON.stringify(name)},
    importPath: ${JSON.stringify(`@proto.ui/prototypes-lucide/icons/${name}`)},
    asHookExport: ${JSON.stringify(`asLucide${pascal}Icon`)},
    prototypeExport: ${JSON.stringify(`lucide${pascal}Icon`)},
    renderExport: ${JSON.stringify(`renderLucide${pascal}Icon`)},
  }`;
  };

  const entries = iconNames
    .map((name) => {
      return `  ${toEntryLiteral(name)},`;
    })
    .join('\n');

  const mapEntries = iconNames
    .map((name) => `  ${JSON.stringify(name)}: ${toEntryLiteral(name)},`)
    .join('\n');

  return `// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import type { LucideIconName } from './icon/icons';

export interface LucideIconManifestEntry {
  name: LucideIconName;
  importPath: string;
  asHookExport: string;
  prototypeExport: string;
  renderExport: string;
}

export const LUCIDE_ICON_MANIFEST = [
${entries}
] as const satisfies readonly LucideIconManifestEntry[];

export const LUCIDE_ICON_MANIFEST_MAP: Record<LucideIconName, LucideIconManifestEntry> = {
${mapEntries}
};
`;
}

function createAsHookSnippet(iconName) {
  const pascal = toPascalCase(iconName);
  return `import { definePrototype } from '@proto.ui/core';
import { asLucide${pascal}Icon, renderLucide${pascal}Icon } from '@proto.ui/prototypes-lucide/icons/${iconName}';

const iconLikeTrigger = definePrototype({
  name: 'my-trigger',
  setup() {
    asLucide${pascal}Icon();
    return (renderer) => [
      renderer.r.slot(),
      renderLucide${pascal}Icon(renderer, { size: 16 }),
    ];
  },
});`;
}

function createRenderSnippet(iconName) {
  const pascal = toPascalCase(iconName);
  return `import { renderLucide${pascal}Icon } from '@proto.ui/prototypes-lucide/icons/${iconName}';

return (renderer) =>
  renderer.el('span', [
    renderLucide${pascal}Icon(renderer, { size: 16, strokeWidth: 2 }),
  ]);`;
}

function createSnippetsSource(iconNames) {
  const entries = iconNames
    .map((name) => {
      return `  ${JSON.stringify(name)}: {
    asHook: ${JSON.stringify(createAsHookSnippet(name))},
    render: ${JSON.stringify(createRenderSnippet(name))},
  },`;
    })
    .join('\n');

  return `// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import type { LucideIconName } from './icon/icons';

export type LucideIconSnippetKind = 'asHook' | 'render';

export interface LucideIconSnippets {
  asHook: string;
  render: string;
}

export const LUCIDE_ICON_SNIPPETS: Record<LucideIconName, LucideIconSnippets> = {
${entries}
};

export function getLucideIconSnippet(
  name: LucideIconName,
  kind: LucideIconSnippetKind = 'asHook'
): string {
  return LUCIDE_ICON_SNIPPETS[name][kind];
}
`;
}

function createLoadersSource(iconNames) {
  const mapEntries = iconNames
    .map((name) => `  ${JSON.stringify(name)}: typeof import('./icons/${name}');`)
    .join('\n');

  const loaderEntries = iconNames
    .map((name) => `  ${JSON.stringify(name)}: () => import('./icons/${name}'),`)
    .join('\n');

  const shapeMapEntries = iconNames
    .map((name) => `  ${JSON.stringify(name)}: typeof import('./shapes/${name}');`)
    .join('\n');

  const shapeLoaderEntries = iconNames
    .map((name) => `  ${JSON.stringify(name)}: () => import('./shapes/${name}'),`)
    .join('\n');

  return `// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import type { LucideIconName } from './icon/icons';

export type LucideIconModuleMap = {
${mapEntries}
};

export type LucideIconModule = LucideIconModuleMap[LucideIconName];

const LUCIDE_ICON_LOADERS: {
  [K in LucideIconName]: () => Promise<LucideIconModuleMap[K]>;
} = {
${loaderEntries}
};

export function loadLucideIcon<N extends LucideIconName>(
  name: N
): Promise<LucideIconModuleMap[N]> {
  return LUCIDE_ICON_LOADERS[name]();
}

export type LucideIconShapeModuleMap = {
${shapeMapEntries}
};

export type LucideIconShapeModule = LucideIconShapeModuleMap[LucideIconName];

const LUCIDE_ICON_SHAPE_LOADERS: {
  [K in LucideIconName]: () => Promise<LucideIconShapeModuleMap[K]>;
} = {
${shapeLoaderEntries}
};

export function loadLucideIconShape<N extends LucideIconName>(
  name: N
): Promise<LucideIconShapeModuleMap[N]> {
  return LUCIDE_ICON_SHAPE_LOADERS[name]();
}
`;
}

async function clearGeneratedIconModules() {
  await fs.mkdir(iconDir, { recursive: true });
  const entries = await fs.readdir(iconDir, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts')
      .map((entry) => fs.unlink(path.join(iconDir, entry.name)))
  );
}

async function clearGeneratedShapeModules() {
  await fs.mkdir(shapeDir, { recursive: true });
  const entries = await fs.readdir(shapeDir, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
      .map((entry) => fs.unlink(path.join(shapeDir, entry.name)))
  );
}

async function main() {
  const config = JSON.parse(await fs.readFile(configPath, 'utf8'));

  const lucidePkgPath = require.resolve('lucide-static/package.json');
  const lucideDir = path.dirname(lucidePkgPath);
  const nodeMapPath = path.join(lucideDir, 'icon-nodes.json');
  const nodeMap = JSON.parse(await fs.readFile(nodeMapPath, 'utf8'));

  const configuredIcons = config?.icons;
  const iconNames =
    configuredIcons === 'all'
      ? Object.keys(nodeMap).sort((a, b) => a.localeCompare(b))
      : configuredIcons;

  if (!Array.isArray(iconNames) || iconNames.length === 0) {
    throw new Error(
      `icons.config.json must provide "icons": "all" or a non-empty icon name array.`
    );
  }

  const unique = new Set();
  for (const name of iconNames) {
    if (typeof name !== 'string' || !name.trim()) {
      throw new Error(`icons.config.json contains invalid icon name: ${JSON.stringify(name)}`);
    }
    if (unique.has(name)) {
      throw new Error(`icons.config.json contains duplicate icon name: ${JSON.stringify(name)}`);
    }
    unique.add(name);
  }

  for (const iconName of iconNames) {
    if (!nodeMap[iconName]) {
      throw new Error(`Icon '${iconName}' not found in lucide-static icon-nodes.json.`);
    }
  }

  await clearGeneratedIconModules();
  await clearGeneratedShapeModules();

  const writeJobs = [];
  for (const iconName of iconNames) {
    const nodes = nodeMap[iconName];
    writeJobs.push(
      fs.writeFile(
        path.join(iconDir, `${iconName}.ts`),
        createIconModuleSource(iconName, nodes),
        'utf8'
      )
    );
    writeJobs.push(
      fs.writeFile(
        path.join(shapeDir, `${iconName}.ts`),
        createShapeModuleSource(iconName, nodes),
        'utf8'
      )
    );
  }

  writeJobs.push(fs.writeFile(output.iconRegistry, createIconRegistrySource(iconNames), 'utf8'));
  writeJobs.push(fs.writeFile(output.iconIndex, createIconIndexSource(iconNames), 'utf8'));
  writeJobs.push(fs.writeFile(output.manifest, createManifestSource(iconNames), 'utf8'));
  writeJobs.push(fs.writeFile(output.snippets, createSnippetsSource(iconNames), 'utf8'));
  writeJobs.push(fs.writeFile(output.loaders, createLoadersSource(iconNames), 'utf8'));

  await Promise.all(writeJobs);
  process.stdout.write(
    `[prototypes-lucide] generated ${iconNames.length} icon modules and manifests under src/icons\n`
  );
}

main().catch((error) => {
  process.stderr.write(`[prototypes-lucide] generation failed: ${error.message}\n`);
  process.exit(1);
});
