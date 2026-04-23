// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sunrise' as const;
export const LUCIDE_SUNRISE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v8' }),
  svg.path({ d: 'm4.93 10.93 1.41 1.41' }),
  svg.path({ d: 'M2 18h2' }),
  svg.path({ d: 'M20 18h2' }),
  svg.path({ d: 'm19.07 10.93-1.41 1.41' }),
  svg.path({ d: 'M22 22H2' }),
  svg.path({ d: 'm8 6 4-4 4 4' }),
  svg.path({ d: 'M16 18a4 4 0 0 0-8 0' }),
];

export function renderLucideSunriseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SUNRISE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sunrise-icon',
  prototypeName: 'lucide-sunrise-icon',
  shapeFactory: LUCIDE_SUNRISE_SHAPE_FACTORY,
});

export const asLucideSunriseIcon = fixed.asHook;
export const lucideSunriseIcon = fixed.prototype;
export default lucideSunriseIcon;
