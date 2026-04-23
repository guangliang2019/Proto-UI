// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'egg-fried' as const;
export const LUCIDE_EGG_FRIED_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 11.5, cy: 12.5, r: 3.5 }),
  svg.path({
    d: 'M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z',
  }),
];

export function renderLucideEggFriedIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_EGG_FRIED_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-egg-fried-icon',
  prototypeName: 'lucide-egg-fried-icon',
  shapeFactory: LUCIDE_EGG_FRIED_SHAPE_FACTORY,
});

export const asLucideEggFriedIcon = fixed.asHook;
export const lucideEggFriedIcon = fixed.prototype;
export default lucideEggFriedIcon;
