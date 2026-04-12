import type { HitParticipationMode, HitParticipationRegion } from '@proto.ui/core';
import type { HitParticipationHostBridge } from '@proto.ui/module-hit-participation';

const HIT_PARTICIPATION_MODE_MARK = Symbol.for('@proto.ui/adapter-base/__hit_participation_mode');
const HIT_PARTICIPATION_PREV_POINTER_EVENTS_MARK = Symbol.for(
  '@proto.ui/adapter-base/__hit_participation_prev_pointer_events'
);

type HostElement = HTMLElement & Record<symbol, unknown>;

function isHostElement(target: unknown): target is HostElement {
  return target instanceof HTMLElement;
}

function shouldDisablePointerEvents(mode: HitParticipationMode): boolean {
  return mode === 'disabled' || mode === 'passthrough';
}

function applyMode(target: HostElement, mode: HitParticipationMode): void {
  if (!(HIT_PARTICIPATION_PREV_POINTER_EVENTS_MARK in target)) {
    target[HIT_PARTICIPATION_PREV_POINTER_EVENTS_MARK] = target.style.pointerEvents;
  }

  target[HIT_PARTICIPATION_MODE_MARK] = mode;

  if (shouldDisablePointerEvents(mode)) {
    target.style.pointerEvents = 'none';
    return;
  }

  const prevPointerEvents = target[HIT_PARTICIPATION_PREV_POINTER_EVENTS_MARK];
  target.style.pointerEvents = typeof prevPointerEvents === 'string' ? prevPointerEvents : '';
}

function clearMode(target: HostElement): void {
  const prevPointerEvents = target[HIT_PARTICIPATION_PREV_POINTER_EVENTS_MARK];
  target.style.pointerEvents = typeof prevPointerEvents === 'string' ? prevPointerEvents : '';
  delete target[HIT_PARTICIPATION_MODE_MARK];
  delete target[HIT_PARTICIPATION_PREV_POINTER_EVENTS_MARK];
}

function getElementRegions(regions: readonly HitParticipationRegion[]): HostElement[] {
  const seen = new Set<HostElement>();
  const elements: HostElement[] = [];

  for (const region of regions) {
    if (!isHostElement(region.target) || seen.has(region.target)) continue;
    seen.add(region.target);
    elements.push(region.target);
  }

  return elements;
}

export function createWebHitParticipationHostBridge(): HitParticipationHostBridge {
  let applied = new Map<HostElement, HitParticipationMode>();

  return {
    sync({ regions }) {
      const next = new Map<HostElement, HitParticipationMode>();

      for (const region of regions) {
        if (!isHostElement(region.target)) continue;
        next.set(region.target, region.mode);
      }

      for (const [target] of applied) {
        if (next.has(target)) continue;
        clearMode(target);
      }

      for (const target of getElementRegions(regions)) {
        const mode = next.get(target);
        if (!mode) continue;
        applyMode(target, mode);
      }

      applied = next;
    },
  };
}

export const __HIT_PARTICIPATION_MODE_MARK = HIT_PARTICIPATION_MODE_MARK;
