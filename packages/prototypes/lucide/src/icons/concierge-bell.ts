// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'concierge-bell' as const;
export const LUCIDE_CONCIERGE_BELL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z' }),
  svg.path({ d: 'M20 16a8 8 0 1 0-16 0' }),
  svg.path({ d: 'M12 4v4' }),
  svg.path({ d: 'M10 4h4' }),
];

export function renderLucideConciergeBellIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CONCIERGE_BELL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-concierge-bell-icon',
  prototypeName: 'lucide-concierge-bell-icon',
  shapeFactory: LUCIDE_CONCIERGE_BELL_SHAPE_FACTORY,
});

export const asLucideConciergeBellIcon = fixed.asHook;
export const lucideConciergeBellIcon = fixed.prototype;
export default lucideConciergeBellIcon;
