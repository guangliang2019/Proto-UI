// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'fishing-hook' as const;
export const LUCIDE_FISHING_HOOK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10' }),
  svg.path({ d: 'M20.414 8.586 22 7' }),
  svg.circle({ cx: 19, cy: 10, r: 2 }),
];

export function renderLucideFishingHookIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FISHING_HOOK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-fishing-hook-icon',
  prototypeName: 'lucide-fishing-hook-icon',
  shapeFactory: LUCIDE_FISHING_HOOK_SHAPE_FACTORY,
});

export const asLucideFishingHookIcon = fixed.asHook;
export const lucideFishingHookIcon = fixed.prototype;
export default lucideFishingHookIcon;
