// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'battery' as const;
export const LUCIDE_BATTERY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M 22 14 L 22 10' }),
  svg.rect({ x: 2, y: 6, width: 16, height: 12, rx: 2 }),
];

export function renderLucideBatteryIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BATTERY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-battery-icon',
  prototypeName: 'lucide-battery-icon',
  shapeFactory: LUCIDE_BATTERY_SHAPE_FACTORY,
});

export const asLucideBatteryIcon = fixed.asHook;
export const lucideBatteryIcon = fixed.prototype;
export default lucideBatteryIcon;
