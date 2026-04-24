// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'battery-warning' as const;
export const LUCIDE_BATTERY_WARNING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 17h.01' }),
  svg.path({ d: 'M10 7v6' }),
  svg.path({ d: 'M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2' }),
  svg.path({ d: 'M22 14v-4' }),
  svg.path({ d: 'M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2' }),
];

export function renderLucideBatteryWarningIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BATTERY_WARNING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-battery-warning-icon',
  prototypeName: 'lucide-battery-warning-icon',
  shapeFactory: LUCIDE_BATTERY_WARNING_SHAPE_FACTORY,
});

export const asLucideBatteryWarningIcon = fixed.asHook;
export const lucideBatteryWarningIcon = fixed.prototype;
export default lucideBatteryWarningIcon;
