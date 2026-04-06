import type { Prototype } from '@proto.ui/core';

export function createInstanceTreeMarkers(symbolName: string) {
  const PROTO_INSTANCE = Symbol.for(symbolName);
  const PROTO_BY_INSTANCE = new WeakMap<HTMLElement, Prototype<any>>();

  function markProtoInstance(el: HTMLElement, proto: Prototype<any>) {
    (el as any)[PROTO_INSTANCE] = true;
    PROTO_BY_INSTANCE.set(el, proto);
  }

  function getProtoParent(instance: HTMLElement): HTMLElement | null {
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

  function getPrototypeByInstance(instance: HTMLElement): Prototype<any> | null {
    return PROTO_BY_INSTANCE.get(instance) ?? null;
  }

  function isProtoInstance(node: Node | null): node is HTMLElement {
    if (!node) return false;
    return (node as any)[PROTO_INSTANCE] === true;
  }

  return {
    PROTO_INSTANCE,
    markProtoInstance,
    getProtoParent,
    getPrototypeByInstance,
    isProtoInstance,
  };
}
