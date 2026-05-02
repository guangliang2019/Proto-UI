// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sprout' as const;
export const LUCIDE_SPROUT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3',
  }),
  svg.path({ d: 'M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4' }),
  svg.path({ d: 'M5 21h14' }),
];

export function renderLucideSproutIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPROUT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sprout-icon',
  prototypeName: 'lucide-sprout-icon',
  shapeFactory: LUCIDE_SPROUT_SHAPE_FACTORY,
});

export const asLucideSproutIcon = fixed.asHook;
export const lucideSproutIcon = fixed.prototype;
export default lucideSproutIcon;
