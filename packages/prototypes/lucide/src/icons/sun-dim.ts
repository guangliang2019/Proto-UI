// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sun-dim' as const;
export const LUCIDE_SUN_DIM_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 4 }),
  svg.path({ d: 'M12 4h.01' }),
  svg.path({ d: 'M20 12h.01' }),
  svg.path({ d: 'M12 20h.01' }),
  svg.path({ d: 'M4 12h.01' }),
  svg.path({ d: 'M17.657 6.343h.01' }),
  svg.path({ d: 'M17.657 17.657h.01' }),
  svg.path({ d: 'M6.343 17.657h.01' }),
  svg.path({ d: 'M6.343 6.343h.01' }),
];

export function renderLucideSunDimIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SUN_DIM_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sun-dim-icon',
  prototypeName: 'lucide-sun-dim-icon',
  shapeFactory: LUCIDE_SUN_DIM_SHAPE_FACTORY,
});

export const asLucideSunDimIcon = fixed.asHook;
export const lucideSunDimIcon = fixed.prototype;
export default lucideSunDimIcon;
