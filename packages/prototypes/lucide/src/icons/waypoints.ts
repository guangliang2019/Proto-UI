// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'waypoints' as const;
export const LUCIDE_WAYPOINTS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10.586 5.414-5.172 5.172' }),
  svg.path({ d: 'm18.586 13.414-5.172 5.172' }),
  svg.path({ d: 'M6 12h12' }),
  svg.circle({ cx: 12, cy: 20, r: 2 }),
  svg.circle({ cx: 12, cy: 4, r: 2 }),
  svg.circle({ cx: 20, cy: 12, r: 2 }),
  svg.circle({ cx: 4, cy: 12, r: 2 }),
];

export function renderLucideWaypointsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WAYPOINTS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-waypoints-icon',
  prototypeName: 'lucide-waypoints-icon',
  shapeFactory: LUCIDE_WAYPOINTS_SHAPE_FACTORY,
});

export const asLucideWaypointsIcon = fixed.asHook;
export const lucideWaypointsIcon = fixed.prototype;
export default lucideWaypointsIcon;
