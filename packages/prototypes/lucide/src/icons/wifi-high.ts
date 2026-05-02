// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wifi-high' as const;
export const LUCIDE_WIFI_HIGH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 20h.01' }),
  svg.path({ d: 'M5 12.859a10 10 0 0 1 14 0' }),
  svg.path({ d: 'M8.5 16.429a5 5 0 0 1 7 0' }),
];

export function renderLucideWifiHighIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WIFI_HIGH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wifi-high-icon',
  prototypeName: 'lucide-wifi-high-icon',
  shapeFactory: LUCIDE_WIFI_HIGH_SHAPE_FACTORY,
});

export const asLucideWifiHighIcon = fixed.asHook;
export const lucideWifiHighIcon = fixed.prototype;
export default lucideWifiHighIcon;
