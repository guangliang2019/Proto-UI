// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sun-medium' as const;
export const LUCIDE_SUN_MEDIUM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 4 }),
  svg.path({ d: 'M12 3v1' }),
  svg.path({ d: 'M12 20v1' }),
  svg.path({ d: 'M3 12h1' }),
  svg.path({ d: 'M20 12h1' }),
  svg.path({ d: 'm18.364 5.636-.707.707' }),
  svg.path({ d: 'm6.343 17.657-.707.707' }),
  svg.path({ d: 'm5.636 5.636.707.707' }),
  svg.path({ d: 'm17.657 17.657.707.707' }),
];

export function renderLucideSunMediumIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SUN_MEDIUM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sun-medium-icon',
  prototypeName: 'lucide-sun-medium-icon',
  shapeFactory: LUCIDE_SUN_MEDIUM_SHAPE_FACTORY,
});

export const asLucideSunMediumIcon = fixed.asHook;
export const lucideSunMediumIcon = fixed.prototype;
export default lucideSunMediumIcon;
