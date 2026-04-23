// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'battery-plus' as const;
export const LUCIDE_BATTERY_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 9v6' }),
  svg.path({ d: 'M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605' }),
  svg.path({ d: 'M22 14v-4' }),
  svg.path({ d: 'M7 12h6' }),
  svg.path({ d: 'M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606' }),
];

export function renderLucideBatteryPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BATTERY_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-battery-plus-icon',
  prototypeName: 'lucide-battery-plus-icon',
  shapeFactory: LUCIDE_BATTERY_PLUS_SHAPE_FACTORY,
});

export const asLucideBatteryPlusIcon = fixed.asHook;
export const lucideBatteryPlusIcon = fixed.prototype;
export default lucideBatteryPlusIcon;
