/**
 * 从 .demo.ts 扫描 prototypeId，根据 @packages/prototype-libs 的 package.json
 * 自动生成 prototype-config.ts
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { DemoSpec } from '../../src/components/PrototypePreviewer/demo-types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEMO_COMPONENTS_ROOT = resolve(__dirname, '../../src/content/docs/demo_components');
const PROTOTYPE_LIBS_ROOT = resolve(__dirname, '../../../../packages/prototype-libs');
const CONFIG_OUTPUT = resolve(__dirname, 'prototype-config.ts');

/** 从 DemoSpec 树递归收集所有 prototypeId */
function collectPrototypeIds(node: unknown, out: Set<string>): void {
  if (!node || typeof node !== 'object') return;
  const n = node as Record<string, unknown>;
  if (n.kind === 'proto' && typeof n.prototypeId === 'string') {
    out.add(n.prototypeId);
  }
  const kids = n.children;
  if (Array.isArray(kids)) {
    for (const child of kids) collectPrototypeIds(child, out);
  }
}

/** 将 kebab-case 转为 PascalCase，如 shadcn-tabs-root → ShadcnTabsRoot */
function toPascalCase(s: string): string {
  return s
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

/** 从 prototypeId 取前缀，如 shadcn-tabs-root → shadcn */
function getPrefix(prototypeId: string): string {
  const idx = prototypeId.indexOf('-');
  return idx >= 0 ? prototypeId.slice(0, idx) : prototypeId;
}

/** 获取 prototype-libs 下包的 name 字段 */
async function getPackageName(prefix: string): Promise<string | null> {
  try {
    const pkgPath = join(PROTOTYPE_LIBS_ROOT, prefix, 'package.json');
    const content = await readFile(pkgPath, 'utf8');
    const pkg = JSON.parse(content) as { name?: string };
    return pkg.name ?? null;
  } catch {
    return null;
  }
}

async function listAllDemoFiles(): Promise<string[]> {
  const folders = await readdir(DEMO_COMPONENTS_ROOT, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of folders) {
    if (!entry.isDirectory()) continue;
    const folderPath = join(DEMO_COMPONENTS_ROOT, entry.name);
    const entries = await readdir(folderPath, { withFileTypes: true });
    for (const e of entries) {
      if (e.isFile() && e.name.endsWith('.demo.ts')) {
        files.push(join(folderPath, e.name));
      }
    }
  }
  return files.sort((a, b) => a.localeCompare(b));
}

async function loadDemo(filePath: string): Promise<DemoSpec | null> {
  try {
    const mod = await import(pathToFileURL(filePath).href + '?t=' + Date.now());
    const demo = mod?.default;
    if (demo?.type === 'demo' && demo?.root) return demo as DemoSpec;
  } catch (err) {
    console.warn(`[generate-code] 加载失败: ${filePath}`, err);
  }
  return null;
}

export async function generatePrototypeMapping(): Promise<void> {
  const allIds = new Set<string>();
  const demoFiles = await listAllDemoFiles();

  for (const filePath of demoFiles) {
    const demo = await loadDemo(filePath);
    if (demo) collectPrototypeIds(demo.root, allIds);
  }

  const mappings: Array<{ id: string; component: string; importPath: string }> = [];
  const prefixToImportPath = new Map<string, string>();

  for (const id of [...allIds].sort()) {
    const component = toPascalCase(id);
    const prefix = getPrefix(id);
    let importPath = prefixToImportPath.get(prefix);
    if (importPath === undefined) {
      const pkgName = await getPackageName(prefix);
      importPath = pkgName ?? `@prototype-libs/${prefix}`;
      prefixToImportPath.set(prefix, importPath);
      if (!pkgName) {
        console.warn(
          `[generate-code] 未找到 packages/prototype-libs/${prefix}/package.json，使用默认 importPath: ${importPath}`
        );
      }
    }
    mappings.push({ id, component, importPath });
  }

  const lines: string[] = [
    '/**',
    ' * prototypeId -> 框架组件的映射配置（由 generate-code 根据 .demo.ts 自动生成）',
    ' * 用于 DemoSpec 代码生成时，将 proto 节点映射为 Vue/React 组件',
    ' */',
    'export type ComponentMapping = {',
    '  component: string;',
    '  importPath: string;',
    '  iconPackage?: "lucide-vue-next" | "lucide-react";',
    '};',
    '',
    'export type WebComponentMapping = {',
    '  tag: string;',
    '};',
    '',
    'export type PrototypeMapping = {',
    '  component: string;',
    '  importPath: string;',
    '  webComponent?: WebComponentMapping;',
    '};',
    '',
    'export const prototypeMappings: Record<string, PrototypeMapping> = {',
    ...mappings.map(
      (m) => `  "${m.id}": { component: "${m.component}", importPath: "${m.importPath}" },`
    ),
    '};',
    '',
    'export const defaultIconMappings = {',
    '  vue: { ArrowUpIcon: "lucide-vue-next" },',
    '  react: { ArrowUpIcon: "lucide-react" },',
    '};',
  ];

  await writeFile(CONFIG_OUTPUT, lines.join('\n'), 'utf8');
  console.log(`[generate-code] 已生成 prototype-config.ts（${mappings.length} 个映射）`);
}
