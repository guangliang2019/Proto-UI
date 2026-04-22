#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const pkgDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(pkgDir, 'icons.config.json');
const outputPath = path.join(pkgDir, 'src', 'icon', 'icons.generated.ts');

const SUPPORTED_TAGS = new Set(['path', 'circle', 'line', 'rect', 'polyline']);

function toLiteral(value) {
  if (typeof value === 'number') return String(value);
  if (typeof value !== 'string') return JSON.stringify(value);
  if (/^-?\d+(\.\d+)?$/.test(value)) return String(Number(value));
  return JSON.stringify(value);
}

function normalizeAttrs(attrs) {
  const out = {};
  for (const [key, value] of Object.entries(attrs)) {
    out[key] = typeof value === 'string' ? value.trim() : value;
  }
  return out;
}

function attrsToObjectLiteral(attrs) {
  const entries = Object.entries(attrs);
  return `{ ${entries.map(([key, value]) => `${key}: ${toLiteral(value)}`).join(', ')} }`;
}

function buildFactoryBody(nodes, iconName) {
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

function renderSource(iconNames, nodeMap) {
  const entries = iconNames
    .map((iconName) => {
      const nodes = nodeMap[iconName];
      if (!nodes) {
        throw new Error(`Icon '${iconName}' not found in lucide-static icon-nodes.json.`);
      }
      return `  ${JSON.stringify(iconName)}: (svg) => ${buildFactoryBody(nodes, iconName)},`;
    })
    .join('\n');

  return `// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import type { SvgFactories, TemplateChildren } from '@proto.ui/core';

export const LUCIDE_ICON_NAMES = [
${iconNames.map((name) => `  ${JSON.stringify(name)},`).join('\n')}
] as const;

export type LucideIconName = (typeof LUCIDE_ICON_NAMES)[number];

export function isLucideIconName(value: string): value is LucideIconName {
  return (LUCIDE_ICON_NAMES as readonly string[]).includes(value);
}

type IconShapeFactory = (svg: SvgFactories) => TemplateChildren;

export const LUCIDE_ICON_REGISTRY: Record<LucideIconName, IconShapeFactory> = {
${entries}
};
`;
}

async function main() {
  const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
  const iconNames = config?.icons;
  if (!Array.isArray(iconNames) || iconNames.length === 0) {
    throw new Error(`icons.config.json must provide a non-empty "icons" array.`);
  }

  for (const name of iconNames) {
    if (typeof name !== 'string' || !name.trim()) {
      throw new Error(`icons.config.json contains invalid icon name: ${JSON.stringify(name)}`);
    }
  }

  const lucidePkgPath = require.resolve('lucide-static/package.json');
  const lucideDir = path.dirname(lucidePkgPath);
  const nodeMapPath = path.join(lucideDir, 'icon-nodes.json');
  const nodeMap = JSON.parse(await fs.readFile(nodeMapPath, 'utf8'));

  const source = renderSource(iconNames, nodeMap);
  await fs.writeFile(outputPath, source, 'utf8');
  process.stdout.write(
    `[prototypes-lucide] generated ${path.relative(pkgDir, outputPath)} (${iconNames.length} icons)\n`
  );
}

main().catch((error) => {
  process.stderr.write(`[prototypes-lucide] generation failed: ${error.message}\n`);
  process.exit(1);
});
