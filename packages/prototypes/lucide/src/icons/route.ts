// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'route' as const;
export const LUCIDE_ROUTE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 6, cy: 19, r: 3 }),
  svg.path({ d: 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15' }),
  svg.circle({ cx: 18, cy: 5, r: 3 }),
];

export function renderLucideRouteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROUTE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-route-icon',
  prototypeName: 'lucide-route-icon',
  shapeFactory: LUCIDE_ROUTE_SHAPE_FACTORY,
});

export const asLucideRouteIcon = fixed.asHook;
export const lucideRouteIcon = fixed.prototype;
export default lucideRouteIcon;
