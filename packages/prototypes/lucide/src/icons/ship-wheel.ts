// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ship-wheel' as const;
export const LUCIDE_SHIP_WHEEL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 8 }),
  svg.path({ d: 'M12 2v7.5' }),
  svg.path({ d: 'm19 5-5.23 5.23' }),
  svg.path({ d: 'M22 12h-7.5' }),
  svg.path({ d: 'm19 19-5.23-5.23' }),
  svg.path({ d: 'M12 14.5V22' }),
  svg.path({ d: 'M10.23 13.77 5 19' }),
  svg.path({ d: 'M9.5 12H2' }),
  svg.path({ d: 'M10.23 10.23 5 5' }),
  svg.circle({ cx: 12, cy: 12, r: 2.5 }),
];

export function renderLucideShipWheelIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHIP_WHEEL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ship-wheel-icon',
  prototypeName: 'lucide-ship-wheel-icon',
  shapeFactory: LUCIDE_SHIP_WHEEL_SHAPE_FACTORY,
});

export const asLucideShipWheelIcon = fixed.asHook;
export const lucideShipWheelIcon = fixed.prototype;
export default lucideShipWheelIcon;
