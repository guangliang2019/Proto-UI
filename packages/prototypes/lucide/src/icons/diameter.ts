// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'diameter' as const;
export const LUCIDE_DIAMETER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 19, cy: 19, r: 2 }),
  svg.circle({ cx: 5, cy: 5, r: 2 }),
  svg.path({ d: 'M6.48 3.66a10 10 0 0 1 13.86 13.86' }),
  svg.path({ d: 'm6.41 6.41 11.18 11.18' }),
  svg.path({ d: 'M3.66 6.48a10 10 0 0 0 13.86 13.86' }),
];

export function renderLucideDiameterIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DIAMETER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-diameter-icon',
  prototypeName: 'lucide-diameter-icon',
  shapeFactory: LUCIDE_DIAMETER_SHAPE_FACTORY,
});

export const asLucideDiameterIcon = fixed.asHook;
export const lucideDiameterIcon = fixed.prototype;
export default lucideDiameterIcon;
