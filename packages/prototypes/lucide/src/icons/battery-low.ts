// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'battery-low' as const;
export const LUCIDE_BATTERY_LOW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 14v-4' }),
  svg.path({ d: 'M6 14v-4' }),
  svg.rect({ x: 2, y: 6, width: 16, height: 12, rx: 2 }),
];

export function renderLucideBatteryLowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BATTERY_LOW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-battery-low-icon',
  prototypeName: 'lucide-battery-low-icon',
  shapeFactory: LUCIDE_BATTERY_LOW_SHAPE_FACTORY,
});

export const asLucideBatteryLowIcon = fixed.asHook;
export const lucideBatteryLowIcon = fixed.prototype;
export default lucideBatteryLowIcon;
