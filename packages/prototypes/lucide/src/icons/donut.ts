// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'donut' as const;
export const LUCIDE_DONUT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3',
  }),
  svg.circle({ cx: 12, cy: 12, r: 3 }),
];

export function renderLucideDonutIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DONUT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-donut-icon',
  prototypeName: 'lucide-donut-icon',
  shapeFactory: LUCIDE_DONUT_SHAPE_FACTORY,
});

export const asLucideDonutIcon = fixed.asHook;
export const lucideDonutIcon = fixed.prototype;
export default lucideDonutIcon;
