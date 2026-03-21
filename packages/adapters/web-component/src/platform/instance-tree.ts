import type { Prototype } from '@proto-ui/core';

export const __WC_PROTO_INSTANCE = Symbol.for('@proto-ui/adapters.web-component/__proto_instance');

const PROTO_BY_INSTANCE = new WeakMap<HTMLElement, Prototype<any>>();

export function markProtoInstance(el: HTMLElement, proto: Prototype<any>) {
  (el as any)[__WC_PROTO_INSTANCE] = true;
  PROTO_BY_INSTANCE.set(el, proto);
}

export function getProtoParent(instance: HTMLElement): HTMLElement | null {
  let cur: Node | null = instance.parentNode;
  while (cur) {
    if (typeof ShadowRoot !== 'undefined' && cur instanceof ShadowRoot) {
      cur = cur.host;
      continue;
    }
    if (isProtoInstance(cur)) return cur as HTMLElement;
    cur = cur.parentNode;
  }
  return null;
}

export function getPrototypeByInstance(instance: HTMLElement): Prototype<any> | null {
  return PROTO_BY_INSTANCE.get(instance) ?? null;
}

function isProtoInstance(node: Node | null): node is HTMLElement {
  if (!node || !(node as any)) return false;
  return (node as any)[__WC_PROTO_INSTANCE] === true;
}
