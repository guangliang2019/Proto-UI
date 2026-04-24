// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hat-glasses' as const;
export const LUCIDE_HAT_GLASSES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 18a2 2 0 0 0-4 0' }),
  svg.path({
    d: 'm19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11',
  }),
  svg.path({ d: 'M2 11h20' }),
  svg.circle({ cx: 17, cy: 18, r: 3 }),
  svg.circle({ cx: 7, cy: 18, r: 3 }),
];

export function renderLucideHatGlassesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HAT_GLASSES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hat-glasses-icon',
  prototypeName: 'lucide-hat-glasses-icon',
  shapeFactory: LUCIDE_HAT_GLASSES_SHAPE_FACTORY,
});

export const asLucideHatGlassesIcon = fixed.asHook;
export const lucideHatGlassesIcon = fixed.prototype;
export default lucideHatGlassesIcon;
