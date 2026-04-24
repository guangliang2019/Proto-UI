// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ferris-wheel' as const;
export const LUCIDE_FERRIS_WHEEL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 2 }),
  svg.path({ d: 'M12 2v4' }),
  svg.path({ d: 'm6.8 15-3.5 2' }),
  svg.path({ d: 'm20.7 7-3.5 2' }),
  svg.path({ d: 'M6.8 9 3.3 7' }),
  svg.path({ d: 'm20.7 17-3.5-2' }),
  svg.path({ d: 'm9 22 3-8 3 8' }),
  svg.path({ d: 'M8 22h8' }),
  svg.path({ d: 'M18 18.7a9 9 0 1 0-12 0' }),
];

export function renderLucideFerrisWheelIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FERRIS_WHEEL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ferris-wheel-icon',
  prototypeName: 'lucide-ferris-wheel-icon',
  shapeFactory: LUCIDE_FERRIS_WHEEL_SHAPE_FACTORY,
});

export const asLucideFerrisWheelIcon = fixed.asHook;
export const lucideFerrisWheelIcon = fixed.prototype;
export default lucideFerrisWheelIcon;
