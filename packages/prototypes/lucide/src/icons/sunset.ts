// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sunset' as const;
export const LUCIDE_SUNSET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 10V2' }),
  svg.path({ d: 'm4.93 10.93 1.41 1.41' }),
  svg.path({ d: 'M2 18h2' }),
  svg.path({ d: 'M20 18h2' }),
  svg.path({ d: 'm19.07 10.93-1.41 1.41' }),
  svg.path({ d: 'M22 22H2' }),
  svg.path({ d: 'm16 6-4 4-4-4' }),
  svg.path({ d: 'M16 18a4 4 0 0 0-8 0' }),
];

export function renderLucideSunsetIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SUNSET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sunset-icon',
  prototypeName: 'lucide-sunset-icon',
  shapeFactory: LUCIDE_SUNSET_SHAPE_FACTORY,
});

export const asLucideSunsetIcon = fixed.asHook;
export const lucideSunsetIcon = fixed.prototype;
export default lucideSunsetIcon;
