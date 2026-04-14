import type { BoundaryClassification, BoundaryRegion, BoundarySample } from '@proto.ui/core';
import type { BoundaryHostBridge } from '@proto.ui/module-boundary';

const PROTO_PARENT_INSTANCE_MARK = Symbol.for('@proto.ui/adapter-base/__proto_parent_instance');

type ElementWithSymbols = HTMLElement & Record<symbol, unknown>;

function getLinkedProtoParent(target: Node | null): HTMLElement | null {
  if (!(target instanceof HTMLElement)) return null;
  const linkedParent = (target as ElementWithSymbols)[PROTO_PARENT_INSTANCE_MARK];
  return linkedParent instanceof HTMLElement ? linkedParent : null;
}

function getNextBoundaryParent(target: Node | null): Node | null {
  if (!target) return null;

  if (typeof ShadowRoot !== 'undefined' && target instanceof ShadowRoot) {
    return target.host;
  }

  const linkedParent = getLinkedProtoParent(target);
  if (linkedParent && linkedParent !== target) return linkedParent;

  return target.parentNode;
}

function containsWithLinkedParents(container: Node, target: Node): boolean {
  let cur: Node | null = target;
  const visited = new Set<Node>();

  while (cur) {
    if (cur === container) return true;
    if (visited.has(cur)) return false;
    visited.add(cur);
    cur = getNextBoundaryParent(cur);
  }

  return false;
}

function isNodeRegion(region: BoundaryRegion): region is BoundaryRegion & { target: Node } {
  return region.target instanceof Node;
}

export function createWebBoundaryHostBridge(): BoundaryHostBridge {
  return {
    classify(args: {
      regions: readonly BoundaryRegion[];
      sample?: BoundarySample;
    }): BoundaryClassification {
      const target = args.sample?.target;
      if (!(target instanceof Node)) return 'unknown';
      if (args.regions.length === 0) return 'unknown';

      let allRegionsAreNodes = true;

      for (const region of args.regions) {
        if (!isNodeRegion(region)) {
          allRegionsAreNodes = false;
          continue;
        }

        if (containsWithLinkedParents(region.target, target)) {
          return 'inside';
        }
      }

      return allRegionsAreNodes ? 'outside' : 'unknown';
    },
  };
}
