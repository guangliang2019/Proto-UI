// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'route-off' as const;
export const LUCIDE_ROUTE_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 6, cy: 19, r: 3 }),
  svg.path({ d: 'M9 19h8.5c.4 0 .9-.1 1.3-.2' }),
  svg.path({ d: 'M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12' }),
  svg.path({ d: 'm2 2 20 20' }),
  svg.path({ d: 'M21 15.3a3.5 3.5 0 0 0-3.3-3.3' }),
  svg.path({ d: 'M15 5h-4.3' }),
  svg.circle({ cx: 18, cy: 5, r: 3 }),
];

export function renderLucideRouteOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROUTE_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-route-off-icon',
  prototypeName: 'lucide-route-off-icon',
  shapeFactory: LUCIDE_ROUTE_OFF_SHAPE_FACTORY,
});

export const asLucideRouteOffIcon = fixed.asHook;
export const lucideRouteOffIcon = fixed.prototype;
export default lucideRouteOffIcon;
