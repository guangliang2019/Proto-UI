// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'birdhouse' as const;
export const LUCIDE_BIRDHOUSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 18v4' }),
  svg.path({ d: 'm17 18 1.956-11.468' }),
  svg.path({ d: 'm3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8' }),
  svg.path({ d: 'M4 18h16' }),
  svg.path({ d: 'M7 18 5.044 6.532' }),
  svg.circle({ cx: 12, cy: 10, r: 2 }),
];

export function renderLucideBirdhouseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BIRDHOUSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-birdhouse-icon',
  prototypeName: 'lucide-birdhouse-icon',
  shapeFactory: LUCIDE_BIRDHOUSE_SHAPE_FACTORY,
});

export const asLucideBirdhouseIcon = fixed.asHook;
export const lucideBirdhouseIcon = fixed.prototype;
export default lucideBirdhouseIcon;
