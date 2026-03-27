#!/usr/bin/env node
/**
 * CLI：扫描 demo_components 子目录下的 *.demo.ts，生成 prototype-config.ts 与 <folder>Code.ts
 */
import { readdir, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { generatePrototypeMapping } from './generate-prototype.js';
import type { DemoSpec } from '../../src/components/PrototypePreviewer/demo-types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEMO_COMPONENTS_ROOT = resolve(__dirname, '../../src/content/docs/demo_components');

async function listFolderDemos(folderPath: string): Promise<string[]> {
  const entries = await readdir(folderPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.demo.ts'))
    .map((entry) => join(folderPath, entry.name))
    .sort((a, b) => a.localeCompare(b));
}

async function loadDemoByPath(filePath: string): Promise<DemoSpec | null> {
  try {
    const mod = await import(pathToFileURL(filePath).href + '?t=' + Date.now());
    const demo = mod?.default;
    if (demo?.type === 'demo' && demo?.root) return demo as DemoSpec;
  } catch (error) {
    console.warn(`[generate-code] 加载失败: ${filePath}`, error);
  }
  return null;
}

function toPascal(s: string): string {
  return s
    .replace(/[-_]+([a-zA-Z0-9])/g, (_, c) => c.toUpperCase())
    .replace(/^[a-z]/, (c) => c.toUpperCase());
}

function escapeForTemplateLiteral(code: string): string {
  return code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');
}

function renderRuntimeBlock(
  demos: Array<{ demoId: string; wc: string; react: string; vue: string }>,
  runtime: 'wc' | 'react' | 'vue',
  indent = '    '
): string {
  if (demos.length === 0) return '';
  return demos
    .map(({ demoId, [runtime]: code }) => {
      const escaped = escapeForTemplateLiteral(code);
      return `${indent}'${demoId}': formatCode(\`\n${escaped}\n${indent}\`),`;
    })
    .join('\n');
}

function buildCodeFileContent(
  demos: Array<{ demoId: string; wc: string; react: string; vue: string }>
): string {
  const wcContent = renderRuntimeBlock(demos, 'wc');
  const reactContent = renderRuntimeBlock(demos, 'react');
  const vueContent = renderRuntimeBlock(demos, 'vue');
  return `import { formatCode } from '@/utils/conversionUtils';
import type { RuntimeId } from '@/components/PrototypePreviewer/runtimes/registry';

export const codeMap: Record<RuntimeId, Record<string, string>> = {
  wc: {
${wcContent}
  },
  react: {
${reactContent}
  },
  vue: {
${vueContent}
  },
};
`;
}

async function main() {
  // 1. 根据 .demo.ts 自动生成 prototype-mapping.config.ts（需在加载 generate-code 之前完成）
  await generatePrototypeMapping();

  // 2. 动态导入 generate-code，确保使用最新生成的配置
  const { generateReactCode, generateVueCode, generateWebComponentCode } =
    await import('./generate-code.ts');

  const rootEntries = await readdir(DEMO_COMPONENTS_ROOT, { withFileTypes: true });
  const folders = rootEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(DEMO_COMPONENTS_ROOT, entry.name))
    .sort((a, b) => a.localeCompare(b));

  for (const folderPath of folders) {
    const folderName = basename(folderPath);
    const demoFiles = await listFolderDemos(folderPath);
    if (demoFiles.length === 0) {
      continue;
    }

    const generated: Array<{ demoId: string; wc: string; react: string; vue: string }> = [];
    for (const demoFile of demoFiles) {
      const demo = await loadDemoByPath(demoFile);
      if (!demo) continue;

      const demoId = basename(demoFile, '.demo.ts');
      const componentName = `${toPascal(demoId)}Demo`;
      const wc = generateWebComponentCode(demo).trimEnd();
      const react = (await generateReactCode(demo, componentName)).trimEnd();
      const vue = (await generateVueCode(demo)).trimEnd();
      generated.push({ demoId, wc, react, vue });
      console.log(`[generate-code] 已生成 ${folderName}/${demoId}`);
    }

    if (generated.length === 0) continue;

    const outFile = join(folderPath, `${folderName}Code.ts`);
    await writeFile(outFile, buildCodeFileContent(generated), 'utf8');
    console.log(`[generate-code] 已写入 ${outFile}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
