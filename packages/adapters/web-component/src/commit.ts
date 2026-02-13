// packages/adapters/web-component/src/commit.ts

import { applyTemplateStyle } from './style';
import type {
  TemplateChildren,
  TemplateChild,
  TemplateNode,
  TemplateType,
  ReservedType,
} from '@proto-ui/core';

export type CommitOptions = {
  mode?: 'light' | 'shadow';
  slotPool?: Node[];
  owned?: WeakSet<Node>; // 收集“模板创建的节点”，用于区分外部节点
};

export type CommitResult = {
  hasSlot: boolean;
  slotStart?: Text; // light mode only
  slotEnd?: Text; // light mode only
};

function isTemplateNode(x: any): x is TemplateNode {
  return x && typeof x === 'object' && 'type' in x;
}

function toArray(children: TemplateChildren): TemplateChild[] {
  if (children === null) return [];
  return Array.isArray(children) ? (children as any[]) : [children as any];
}

function isReservedType(t: any): t is ReservedType {
  return t && typeof t === 'object' && t.kind === 'slot';
}

function isPrototypeRef(t: any): t is { kind: 'prototype'; name: string; ref?: any } {
  return t && typeof t === 'object' && t.kind === 'prototype' && typeof t.name === 'string';
}

export const ERR_TEMPLATE_PROTOTYPE_REF_V0 = `[Template] PrototypeRef is not allowed in Template v0.`;

function createElementForType(type: TemplateType, doc: Document): Node | null {
  if (typeof type === 'string') return doc.createElement(type);

  if (isReservedType(type)) return null; // slot handled elsewhere

  if (isPrototypeRef(type)) {
    // ✅ v0 contract: adapters MUST reject prototype-level composition
    throw new Error(ERR_TEMPLATE_PROTOTYPE_REF_V0);
  }

  return null;
}

function appendCommittedChild(
  parent: Node,
  child: TemplateChild,
  doc: Document,
  opt: Required<CommitOptions>,
  ctx: { slotUsed: boolean; slotStart?: Text; slotEnd?: Text }
) {
  if (child === null) return;

  if (typeof child === 'string' || typeof child === 'number') {
    parent.appendChild(doc.createTextNode(String(child)));
    return;
  }

  if (!isTemplateNode(child)) {
    parent.appendChild(doc.createTextNode(String(child)));
    return;
  }

  const t = child.type;

  if (isReservedType(t) && t.kind === 'slot') {
    if ((child as any).children != null) {
      throw new Error(`[WC Adapter] slot node must not have children in v0.`);
    }
    if ((child as any).style != null) {
      throw new Error(`[WC Adapter] slot node must not have style in v0.`);
    }
    // v0: 核心语法层已禁止具名，这里仍防御
    if ((t as any).name) {
      throw new Error(`[WC Adapter] named slot is not supported in v0.`);
    }
    if (ctx.slotUsed) {
      throw new Error(`[WC Adapter] multiple slot is not supported in v0.`);
    }
    ctx.slotUsed = true;

    if (opt.mode === 'shadow') {
      const el = doc.createElement('slot');
      opt.owned?.add(el);
      parent.appendChild(el);
      return;
    }

    // light mode: 不产生 <slot>，用空 Text 作为锚点
    const start = doc.createTextNode('');
    const end = doc.createTextNode('');
    opt.owned?.add(start);
    opt.owned?.add(end);

    ctx.slotStart = start;
    ctx.slotEnd = end;

    parent.appendChild(start);
    for (const n of opt.slotPool) parent.appendChild(n);
    parent.appendChild(end);
    return;
  }

  // normal element / prototype
  const node = createElementForType(t, doc);
  if (!node) return;

  opt.owned?.add(node);

  if ((node as any).nodeType === 1) {
    const el = node as Element;

    applyTemplateStyle(el, child.style);

    const kids = toArray(child.children ?? null);
    for (const k of kids) appendCommittedChild(el, k, doc, opt, ctx);
  }

  parent.appendChild(node);
}

export function commitChildren(
  hostRoot: Element | DocumentFragment,
  children: TemplateChildren,
  opt: CommitOptions = {}
): CommitResult {
  const doc = hostRoot.ownerDocument ?? document;
  const container = doc.createDocumentFragment();

  const cfg: Required<CommitOptions> = {
    mode: opt.mode ?? 'light',
    slotPool: opt.slotPool ?? [],
    owned: opt.owned ?? new WeakSet<Node>(),
  };

  const ctx: { slotUsed: boolean; slotStart?: Text; slotEnd?: Text } = {
    slotUsed: false,
  };

  const arr = toArray(children);
  for (const c of arr) appendCommittedChild(container, c, doc, cfg, ctx);

  (hostRoot as any).replaceChildren(...Array.from(container.childNodes));

  return {
    hasSlot: ctx.slotUsed,
    slotStart: ctx.slotStart,
    slotEnd: ctx.slotEnd,
  };
}
