// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'traffic-cone' as const;
export const LUCIDE_TRAFFIC_CONE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16.05 10.966a5 2.5 0 0 1-8.1 0' }),
  svg.path({
    d: 'm16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04',
  }),
  svg.path({ d: 'M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z' }),
  svg.path({ d: 'M9.194 6.57a5 2.5 0 0 0 5.61 0' }),
];

export function renderLucideTrafficConeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRAFFIC_CONE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-traffic-cone-icon',
  prototypeName: 'lucide-traffic-cone-icon',
  shapeFactory: LUCIDE_TRAFFIC_CONE_SHAPE_FACTORY,
});

export const asLucideTrafficConeIcon = fixed.asHook;
export const lucideTrafficConeIcon = fixed.prototype;
export default lucideTrafficConeIcon;
