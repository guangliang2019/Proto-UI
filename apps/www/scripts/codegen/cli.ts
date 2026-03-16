#!/usr/bin/env node
/**
 * CLI：扫描 .mdx 中的 PrototypePreviewer，根据 DemoSpec 生成 Vue/React 代码
 *
 * 用法:
 *   pnpm run codegen                    # 扫描默认 content 目录
 *   pnpm run codegen -- --demo demo-combo  # 仅生成指定 demo
 *   pnpm run codegen -- --output ./out   # 指定输出目录
 */
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { scanMdxFile, type ScannedBlock } from './scan-mdx.js';
import { generateVueCode, generateReactCode } from './generate-code.js';
import type { DemoSpec } from '../../src/components/PrototypePreviewer/demo-types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = resolve(__dirname, '../../src/content');

async function globMdxFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await globMdxFiles(full)));
    } else if (e.isFile() && e.name.endsWith('.mdx')) {
      files.push(full);
    }
  }
  return files;
}

/** 动态加载 demo 模块（.demo.ts），需在 tsx 环境下运行以支持 .ts 导入 */
async function loadDemo(demoId: string): Promise<DemoSpec | null> {
  const candidates = [
    join(CONTENT_ROOT, 'docs/zh-cn', `${demoId}.demo.ts`),
    join(CONTENT_ROOT, 'docs/en', `${demoId}.demo.ts`),
    join(CONTENT_ROOT, `${demoId}.demo.ts`),
  ];
  for (const p of candidates) {
    try {
      const mod = await import(pathToFileURL(p).href + '?t=' + Date.now());
      const demo = mod?.default;
      if (demo?.type === 'demo' && demo?.root) return demo as DemoSpec;
    } catch {
      // 文件不存在或加载失败，尝试下一个
    }
  }
  return null;
}

async function main() {
  const args = process.argv.slice(2);
  const demoFilter = args.includes('--demo') ? args[args.indexOf('--demo') + 1] : null;
  const outIdx = args.indexOf('--output');
  const outputDir = outIdx >= 0 ? resolve(args[outIdx + 1] || './codegen-out') : null;

  console.log('[codegen] 扫描 MDX 文件...\n');
  const mdxFiles = await globMdxFiles(CONTENT_ROOT);
  const allBlocks: ScannedBlock[] = [];

  for (const fp of mdxFiles) {
    const blocks = await scanMdxFile(fp);
    for (const b of blocks) {
      if (demoFilter && b.previewerProps.demoId !== demoFilter) continue;
      allBlocks.push(b);
    }
  }

  const byDemo = new Map<string, { demo: DemoSpec; blocks: ScannedBlock[] }>();
  for (const block of allBlocks) {
    const demoId = block.previewerProps.demoId;
    if (!demoId) continue;
    let entry = byDemo.get(demoId);
    if (!entry) {
      const demo = await loadDemo(demoId);
      if (!demo) {
        console.warn(`[codegen] 未找到 demo: ${demoId}`);
        continue;
      }
      entry = { demo, blocks: [] };
      byDemo.set(demoId, entry);
    }
    entry.blocks.push(block);
  }

  const results: { demoId: string; vue: string; react: string }[] = [];
  for (const [demoId, { demo }] of byDemo) {
    const vueCode = generateVueCode(demo, `${toPascal(demoId)}Demo`);
    const reactCode = generateReactCode(demo, `${toPascal(demoId)}Demo`);
    results.push({ demoId, vue: vueCode, react: reactCode });
    console.log(`[codegen] 已生成: ${demoId}`);
  }

  if (outputDir && results.length > 0) {
    await mkdir(outputDir, { recursive: true });
    for (const r of results) {
      await writeFile(join(outputDir, `${r.demoId}.vue`), r.vue);
      await writeFile(join(outputDir, `${r.demoId}.tsx`), r.react);
    }
    console.log(`\n[codegen] 已写入: ${outputDir}`);
  } else {
    console.log('\n--- Vue 示例 ---');
    if (results[0]) console.log(results[0].vue);
    console.log('\n--- React 示例 ---');
    if (results[0]) console.log(results[0].react);
  }
}

function toPascal(s: string): string {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
