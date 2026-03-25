/**
 * DemoSpec -> Vue/React 代码生成器
 * 将 DemoSpec 树结构转换为框架特定的代码
 */
import prettier from 'prettier';
import type {
  DemoChild,
  DemoNode,
  DemoSpec,
} from '../../src/components/PrototypePreviewer/demo-types';
import { collectPrototypeIds } from '../../src/components/PrototypePreviewer/demo-types';
import { prototypeMappings } from './prototype-config';

/** 使用 Prettier 格式化生成的代码（React 用 typescript 解析器，Vue 用 vue 解析器） */
async function formatWithPrettier(code: string, parser: 'vue' | 'typescript'): Promise<string> {
  const filepath = parser === 'vue' ? 'demo.vue' : 'demo.tsx';
  const config = await prettier.resolveConfig(filepath, { editorconfig: true });
  return prettier.format(code, {
    ...(config ?? {}),
    filepath,
  });
}

function escapeAttr(val: unknown): string {
  if (typeof val === 'string') return JSON.stringify(val);
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  return JSON.stringify(val);
}

/** 将 props 对象转为 Vue 模板属性字符串 */
function propsToVueAttrs(props: Record<string, unknown>): string {
  return Object.entries(props)
    .map(([k, v]) => {
      if (typeof v === 'boolean' && v) return k;
      return `${k}=${escapeAttr(v)}`;
    })
    .join(' ');
}

/** 将 props 对象转为 React 属性 */
function propsToReactProps(props: Record<string, unknown>): string {
  return Object.entries(props)
    .map(([k, v]) => {
      if (typeof v === 'boolean' && v) return k;
      const val = typeof v === 'string' ? `"${v}"` : `{${JSON.stringify(v)}}`;
      return `${k}=${val}`;
    })
    .join(' ');
}

/** 将 camelCase 转为 kebab-case */
function toKebabCase(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/** 将 props 对象转为 WebComponent HTML 属性 */
function propsToHtmlAttrs(props: Record<string, unknown>): string {
  return Object.entries(props)
    .map(([k, v]) => {
      const attr = toKebabCase(k);
      if (typeof v === 'boolean' && v) return attr;
      if (typeof v === 'boolean' && !v) return '';
      return `${attr}=${escapeAttr(v)}`;
    })
    .filter(Boolean)
    .join(' ');
}

/** 根据 prototypeId 获取 WebComponent 标签名 */
function getWcTag(prototypeId: string): string {
  const mapping = prototypeMappings[prototypeId];
  return mapping?.webComponent?.tag ?? `wc-${prototypeId}`;
}

/** 判断是否为块级子节点（多个子节点或含组件） */
function isBlockChildren(children: DemoChild[]): boolean {
  if (children.length > 1) return true;
  if (children.length === 0) return false;
  const c = children[0];
  return typeof c === 'object' && c.kind === 'proto';
}

/** 递归生成 Vue 模板（块级元素换行，避免 Prettier 将 > 断到下行） */
function generateVueTemplate(node: DemoChild): string {
  if (typeof node === 'string') return node.trim();
  if (node.kind === 'text') return node.text.trim();

  if (node.kind === 'box') {
    const classAttr = node.className ? ` class="${node.className}"` : '';
    const childList = (node.children ?? []).map(generateVueTemplate).filter(Boolean);
    const block = isBlockChildren(node.children ?? []);
    const inner = block ? '\n' + childList.join('\n') + '\n' : childList.join('');

    return `<div${classAttr}>${inner}</div>`;
  }

  if (node.kind === 'proto') {
    const mapping = prototypeMappings[node.prototypeId];
    const component = mapping?.component ?? `Unknown-${node.prototypeId}`;
    const props = node.props ?? {};
    const attrs = propsToVueAttrs(props as Record<string, unknown>);

    const childList = (node.children ?? []).map(generateVueTemplate).filter(Boolean);
    const block = isBlockChildren(node.children ?? []);

    if (childList.length > 0) {
      const inner = block ? '\n' + childList.join('\n') + '\n' : childList.join('');
      return attrs
        ? `<${component} ${attrs}>${inner}</${component}>`
        : `<${component}>${inner}</${component}>`;
    }

    return attrs ? `<${component} ${attrs} />` : `<${component} />`;
  }

  return '';
}

/** 递归生成 React JSX */
function generateReactJsx(node: DemoChild): string {
  if (typeof node === 'string') return node.trim();
  if (node.kind === 'text') return node.text.trim();

  if (node.kind === 'box') {
    const classProp = node.className ? ` className="${node.className}"` : '';

    const children = (node.children ?? []).map(generateReactJsx).filter(Boolean).join('');

    return `<div${classProp}>${children}</div>`;
  }

  if (node.kind === 'proto') {
    const mapping = prototypeMappings[node.prototypeId];
    const component = mapping?.component ?? `Unknown${node.prototypeId}`;
    const props = node.props ?? {};
    const propsStr = propsToReactProps(props as Record<string, unknown>);

    const children = (node.children ?? []).map(generateReactJsx).filter(Boolean).join('');

    if (children) {
      return propsStr
        ? `<${component} ${propsStr}>${children}</${component}>`
        : `<${component}>${children}</${component}>`;
    }

    return propsStr ? `<${component} ${propsStr} />` : `<${component} />`;
  }

  return '';
}

/** 递归生成 WebComponent HTML 模板（块级子节点换行并保留缩进） */
function generateHtmlTemplate(node: DemoChild, depth = 0): string {
  const indent = '  '.repeat(depth);
  if (typeof node === 'string') return node.trim();
  if (node.kind === 'text') return node.text.trim();

  if (node.kind === 'box') {
    const classAttr = node.className ? ` class="${node.className}"` : '';
    const childList = (node.children ?? [])
      .map((child) => generateHtmlTemplate(child, depth + 1))
      .filter(Boolean);
    const block = isBlockChildren(node.children ?? []);

    if (childList.length === 0) return `${indent}<div${classAttr}></div>`;
    if (!block) return `${indent}<div${classAttr}>${childList.join('')}</div>`;

    const inner = childList.map((line) => `${line}`).join('\n');
    return `${indent}<div${classAttr}>\n${inner}\n${indent}</div>`;
  }

  if (node.kind === 'proto') {
    const tag = getWcTag(node.prototypeId);
    const props = node.props ?? {};
    const attrs = propsToHtmlAttrs(props as Record<string, unknown>);
    const childList = (node.children ?? [])
      .map((child) => generateHtmlTemplate(child, depth + 1))
      .filter(Boolean);
    const block = isBlockChildren(node.children ?? []);
    const openTag = attrs ? `<${tag} ${attrs}>` : `<${tag}>`;

    if (childList.length === 0) return `${indent}${openTag}</${tag}>`;
    if (!block) return `${indent}${openTag}${childList.join('')}</${tag}>`;

    const inner = childList.map((line) => `${line}`).join('\n');
    return `${indent}${openTag}\n${inner}\n${indent}</${tag}>`;
  }

  return '';
}

/** 按 importPath 分组收集组件，生成合并的 import 语句 */
function buildImports(ids: Set<string>): string[] {
  const byPath = new Map<string, string[]>();
  for (const id of ids) {
    const m = prototypeMappings[id];
    if (m) {
      const list = byPath.get(m.importPath) ?? [];
      if (!list.includes(m.component)) list.push(m.component);
      byPath.set(m.importPath, list);
    }
  }
  return [...byPath.entries()].map(
    ([path, comps]) => `import { ${comps.sort().join(', ')} } from '${path}'`
  );
}

/** 生成 Vue 单文件组件代码（经 Prettier 格式化） */
export async function generateVueCode(demo: DemoSpec): Promise<string> {
  const ids = new Set<string>();
  collectPrototypeIds(demo.root, ids);

  const imports = buildImports(ids);
  const template = generateVueTemplate(demo.root);

  const raw = [
    `<script setup lang="ts">`,
    ...imports,
    `</script>`,
    ``,
    `<template>`,
    template,
    `</template>`,
  ]
    .join('\n')
    .trim();

  return formatWithPrettier(raw, 'vue');
}

/** 生成 WebComponent HTML 代码（纯 HTML，需确保组件已通过脚本注册） */
export function generateWebComponentCode(demo: DemoSpec): string {
  const template = generateHtmlTemplate(demo.root);
  return `${template}`;
}

/** 生成 React 组件代码（经 Prettier 格式化） */
export async function generateReactCode(
  demo: DemoSpec,
  componentName = 'DemoComponent'
): Promise<string> {
  const ids = new Set<string>();
  collectPrototypeIds(demo.root, ids);

  const imports = buildImports(ids).map((s) => s.replace(/'/g, '"'));
  // 如需图标可添加
  // imports.push(`import { ArrowUpIcon } from "lucide-react"`);

  const jsx = generateReactJsx(demo.root);

  const raw = `${imports.join('\n')}

export function ${componentName}() {
  return (
    ${jsx}
  )
}
`;

  return formatWithPrettier(raw, 'typescript');
}
