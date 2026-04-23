// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sandwich' as const;
export const LUCIDE_SANDWICH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777' }),
  svg.path({ d: 'M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25' }),
  svg.path({ d: 'M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9' }),
  svg.path({ d: 'm6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2' }),
  svg.rect({ width: 20, height: 4, x: 2, y: 11, rx: 1 }),
];

export function renderLucideSandwichIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SANDWICH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sandwich-icon',
  prototypeName: 'lucide-sandwich-icon',
  shapeFactory: LUCIDE_SANDWICH_SHAPE_FACTORY,
});

export const asLucideSandwichIcon = fixed.asHook;
export const lucideSandwichIcon = fixed.prototype;
export default lucideSandwichIcon;
