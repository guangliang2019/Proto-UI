// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'watch' as const;
export const LUCIDE_WATCH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 10v2.2l1.6 1' }),
  svg.path({ d: 'm16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05' }),
  svg.path({ d: 'm7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05' }),
  svg.circle({ cx: 12, cy: 12, r: 6 }),
];

export function renderLucideWatchIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WATCH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-watch-icon',
  prototypeName: 'lucide-watch-icon',
  shapeFactory: LUCIDE_WATCH_SHAPE_FACTORY,
});

export const asLucideWatchIcon = fixed.asHook;
export const lucideWatchIcon = fixed.prototype;
export default lucideWatchIcon;
