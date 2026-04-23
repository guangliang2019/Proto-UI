// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'truck' as const;
export const LUCIDE_TRUCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2' }),
  svg.path({ d: 'M15 18H9' }),
  svg.path({
    d: 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14',
  }),
  svg.circle({ cx: 17, cy: 18, r: 2 }),
  svg.circle({ cx: 7, cy: 18, r: 2 }),
];

export function renderLucideTruckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRUCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-truck-icon',
  prototypeName: 'lucide-truck-icon',
  shapeFactory: LUCIDE_TRUCK_SHAPE_FACTORY,
});

export const asLucideTruckIcon = fixed.asHook;
export const lucideTruckIcon = fixed.prototype;
export default lucideTruckIcon;
