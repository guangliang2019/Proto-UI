// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'battery-charging' as const;
export const LUCIDE_BATTERY_CHARGING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm11 7-3 5h4l-3 5' }),
  svg.path({ d: 'M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935' }),
  svg.path({ d: 'M22 14v-4' }),
  svg.path({ d: 'M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936' }),
];

export function renderLucideBatteryChargingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BATTERY_CHARGING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-battery-charging-icon',
  prototypeName: 'lucide-battery-charging-icon',
  shapeFactory: LUCIDE_BATTERY_CHARGING_SHAPE_FACTORY,
});

export const asLucideBatteryChargingIcon = fixed.asHook;
export const lucideBatteryChargingIcon = fixed.prototype;
export default lucideBatteryChargingIcon;
