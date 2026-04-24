// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sun-snow' as const;
export const LUCIDE_SUN_SNOW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 21v-1' }),
  svg.path({ d: 'M10 4V3' }),
  svg.path({ d: 'M10 9a3 3 0 0 0 0 6' }),
  svg.path({ d: 'm14 20 1.25-2.5L18 18' }),
  svg.path({ d: 'm14 4 1.25 2.5L18 6' }),
  svg.path({ d: 'm17 21-3-6 1.5-3H22' }),
  svg.path({ d: 'm17 3-3 6 1.5 3' }),
  svg.path({ d: 'M2 12h1' }),
  svg.path({ d: 'm20 10-1.5 2 1.5 2' }),
  svg.path({ d: 'm3.64 18.36.7-.7' }),
  svg.path({ d: 'm4.34 6.34-.7-.7' }),
];

export function renderLucideSunSnowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SUN_SNOW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sun-snow-icon',
  prototypeName: 'lucide-sun-snow-icon',
  shapeFactory: LUCIDE_SUN_SNOW_SHAPE_FACTORY,
});

export const asLucideSunSnowIcon = fixed.asHook;
export const lucideSunSnowIcon = fixed.prototype;
export default lucideSunSnowIcon;
