/**
 * DemoSpec -> Vue/React 代码生成器
 * 将 DemoSpec 树结构转换为框架特定的代码
 */
import type {
  DemoChild,
  DemoNode,
  DemoSpec,
} from '../../src/components/PrototypePreviewer/demo-types';
import {
  prototypeMappings,
  defaultIconMappings,
  type PrototypeMapping,
} from './prototype-mapping.config';

function escapeAttr(val: unknown): string {
  if (typeof val === 'string') return JSON.stringify(val);
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  return JSON.stringify(val);
}

function collectPrototypeIds(node: DemoChild, out: Set<string>) {
  if (typeof node === 'string') return;
  if (node.kind === 'proto') out.add(node.prototypeId);
  if (node.kind === 'text') return;
  const kids = (node as DemoNode & { children?: DemoChild[] }).children ?? [];
  for (const child of kids) collectPrototypeIds(child, out);
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

function getChildText(node: DemoChild): string {
  if (typeof node === 'string') return node.trim();
  if (node.kind === 'text') return node.text.trim();
  return '';
}

function getChildrenText(nodes: DemoChild[]): string {
  return nodes.map(getChildText).filter(Boolean).join(' ') || '';
}

/** 递归生成 Vue 模板 */
function generateVueTemplate(node: DemoChild, indent: string): string {
  if (typeof node === 'string') return node.trim();
  if (node.kind === 'text') return node.text.trim();

  if (node.kind === 'box') {
    const classAttr = node.className ? ` class="${node.className}"` : '';
    const kids = (node.children ?? [])
      .map((c) => generateVueTemplate(c, indent + '  '))
      .filter(Boolean);
    const inner = kids.length ? `\n${indent}  ${kids.join('\n' + indent + '  ')}\n${indent}` : '';
    return `<div${classAttr}>${inner}</div>`;
  }

  if (node.kind === 'proto') {
    const mapping = prototypeMappings[node.prototypeId]?.vue;
    const component = mapping?.component ?? `Unknown-${node.prototypeId}`;
    const props = node.props ?? {};
    const attrs = propsToVueAttrs(props as Record<string, unknown>);
    const slotContent = getChildrenText(node.children ?? []);

    if (slotContent) {
      return attrs
        ? `<${component} ${attrs}>${slotContent}</${component}>`
        : `<${component}>${slotContent}</${component}>`;
    }
    return attrs ? `<${component} ${attrs} />` : `<${component} />`;
  }

  return '';
}

/** 递归生成 React JSX */
function generateReactJsx(node: DemoChild, indent: string): string {
  if (typeof node === 'string') return node.trim();
  if (node.kind === 'text') return node.text.trim();

  if (node.kind === 'box') {
    const classProp = node.className ? ` className="${node.className}"` : '';
    const kids = (node.children ?? [])
      .map((c) => generateReactJsx(c, indent + '    '))
      .filter(Boolean);
    const inner = kids.length
      ? `\n${kids.map((k) => indent + '    ' + k).join('\n')}\n${indent}  `
      : '';
    return `<div${classProp}>${inner}</div>`;
  }

  if (node.kind === 'proto') {
    const mapping = prototypeMappings[node.prototypeId]?.react;
    const component = mapping?.component ?? `Unknown${node.prototypeId}`;
    const props = node.props ?? {};
    const propsStr = propsToReactProps(props as Record<string, unknown>);
    const slotContent = getChildrenText(node.children ?? []);

    if (slotContent) {
      return propsStr
        ? `<${component} ${propsStr}>${slotContent}</${component}>`
        : `<${component}>${slotContent}</${component}>`;
    }
    return propsStr ? `<${component} ${propsStr} />` : `<${component} />`;
  }

  return '';
}

/** 生成 Vue 单文件组件代码 */
export function generateVueCode(demo: DemoSpec, componentName = 'DemoComponent'): string {
  const ids = new Set<string>();
  collectPrototypeIds(demo.root, ids);

  const imports: string[] = [];
  for (const id of ids) {
    const m = prototypeMappings[id]?.vue;
    if (m) imports.push(`import { ${m.component} } from '${m.importPath}'`);
  }
  // 如需图标可添加
  // imports.push(`import { ArrowUpIcon } from 'lucide-vue-next'`);

  const template = generateVueTemplate(demo.root, '  ');

  return `<script setup lang="ts">
${imports.join('\n')}
</script>

<template>
  ${template}
</template>
`;
}

/** 生成 React 组件代码 */
export function generateReactCode(demo: DemoSpec, componentName = 'DemoComponent'): string {
  const ids = new Set<string>();
  collectPrototypeIds(demo.root, ids);

  const imports: string[] = [];
  for (const id of ids) {
    const m = prototypeMappings[id]?.react;
    if (m) imports.push(`import { ${m.component} } from "${m.importPath}"`);
  }
  // 如需图标可添加
  // imports.push(`import { ArrowUpIcon } from "lucide-react"`);

  const jsx = generateReactJsx(demo.root, '  ');

  return `${imports.join('\n')}

export function ${componentName}() {
  return (
    ${jsx}
  )
}
`;
}
