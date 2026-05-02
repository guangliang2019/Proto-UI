// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wifi-low' as const;
export const LUCIDE_WIFI_LOW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 20h.01' }),
  svg.path({ d: 'M8.5 16.429a5 5 0 0 1 7 0' }),
];

export function renderLucideWifiLowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WIFI_LOW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wifi-low-icon',
  prototypeName: 'lucide-wifi-low-icon',
  shapeFactory: LUCIDE_WIFI_LOW_SHAPE_FACTORY,
});

export const asLucideWifiLowIcon = fixed.asHook;
export const lucideWifiLowIcon = fixed.prototype;
export default lucideWifiLowIcon;
