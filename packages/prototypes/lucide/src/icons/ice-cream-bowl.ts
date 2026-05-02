// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ice-cream-bowl' as const;
export const LUCIDE_ICE_CREAM_BOWL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0',
  }),
  svg.path({ d: 'M12.14 11a3.5 3.5 0 1 1 6.71 0' }),
  svg.path({ d: 'M15.5 6.5a3.5 3.5 0 1 0-7 0' }),
];

export function renderLucideIceCreamBowlIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ICE_CREAM_BOWL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ice-cream-bowl-icon',
  prototypeName: 'lucide-ice-cream-bowl-icon',
  shapeFactory: LUCIDE_ICE_CREAM_BOWL_SHAPE_FACTORY,
});

export const asLucideIceCreamBowlIcon = fixed.asHook;
export const lucideIceCreamBowlIcon = fixed.prototype;
export default lucideIceCreamBowlIcon;
