// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sun-moon' as const;
export const LUCIDE_SUN_MOON_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v2' }),
  svg.path({
    d: 'M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715',
  }),
  svg.path({ d: 'M16 12a4 4 0 0 0-4-4' }),
  svg.path({ d: 'm19 5-1.256 1.256' }),
  svg.path({ d: 'M20 12h2' }),
];

export function renderLucideSunMoonIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SUN_MOON_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sun-moon-icon',
  prototypeName: 'lucide-sun-moon-icon',
  shapeFactory: LUCIDE_SUN_MOON_SHAPE_FACTORY,
});

export const asLucideSunMoonIcon = fixed.asHook;
export const lucideSunMoonIcon = fixed.prototype;
export default lucideSunMoonIcon;
