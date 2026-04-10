import type { Prototype } from '@proto.ui/core';

const PROTO_PARENT_INSTANCE = Symbol.for('@proto.ui/adapter-base/__proto_parent_instance');

type ElementWithProtoParent = HTMLElement & Record<symbol, unknown>;

function writeProtoParentMark(instance: HTMLElement, parent: HTMLElement | null): void {
  const target = instance as ElementWithProtoParent;
  if (parent) {
    target[PROTO_PARENT_INSTANCE] = parent;
    return;
  }
  delete target[PROTO_PARENT_INSTANCE];
}

function readProtoParentMark(instance: HTMLElement): HTMLElement | null {
  const mark = (instance as ElementWithProtoParent)[PROTO_PARENT_INSTANCE];
  return mark instanceof HTMLElement ? mark : null;
}

export function createInstanceTreeMarkers(symbolName: string) {
  const PROTO_INSTANCE = Symbol.for(symbolName);
  const PROTO_BY_INSTANCE = new WeakMap<HTMLElement, Prototype<any>>();

  function markProtoInstance(el: HTMLElement, proto: Prototype<any>) {
    (el as any)[PROTO_INSTANCE] = true;
    PROTO_BY_INSTANCE.set(el, proto);
  }

  const PROTO_PARENT_BY_INSTANCE = new WeakMap<HTMLElement, HTMLElement>();

  function setProtoParent(instance: HTMLElement, parent: HTMLElement | null): void {
    if (parent) {
      PROTO_PARENT_BY_INSTANCE.set(instance, parent);
      writeProtoParentMark(instance, parent);
    } else {
      PROTO_PARENT_BY_INSTANCE.delete(instance);
      writeProtoParentMark(instance, null);
    }
  }

  function getProtoParent(instance: HTMLElement): HTMLElement | null {
    let cur: Node | null =
      readProtoParentMark(instance) ??
      PROTO_PARENT_BY_INSTANCE.get(instance) ??
      instance.parentNode;
    while (cur) {
      if (typeof ShadowRoot !== 'undefined' && cur instanceof ShadowRoot) {
        cur = cur.host;
        continue;
      }
      if (isProtoInstance(cur)) return cur as HTMLElement;

      if (cur instanceof HTMLElement) {
        const linkedParent =
          readProtoParentMark(cur) ?? PROTO_PARENT_BY_INSTANCE.get(cur as HTMLElement) ?? null;
        if (linkedParent && linkedParent !== cur) {
          cur = linkedParent;
          continue;
        }
      }

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
    setProtoParent,
    getProtoParent,
    getPrototypeByInstance,
    isProtoInstance,
  };
}
