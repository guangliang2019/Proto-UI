// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wifi-off' as const;
export const LUCIDE_WIFI_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 20h.01' }),
  svg.path({ d: 'M8.5 16.429a5 5 0 0 1 7 0' }),
  svg.path({ d: 'M5 12.859a10 10 0 0 1 5.17-2.69' }),
  svg.path({ d: 'M19 12.859a10 10 0 0 0-2.007-1.523' }),
  svg.path({ d: 'M2 8.82a15 15 0 0 1 4.177-2.643' }),
  svg.path({ d: 'M22 8.82a15 15 0 0 0-11.288-3.764' }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucideWifiOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WIFI_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wifi-off-icon',
  prototypeName: 'lucide-wifi-off-icon',
  shapeFactory: LUCIDE_WIFI_OFF_SHAPE_FACTORY,
});

export const asLucideWifiOffIcon = fixed.asHook;
export const lucideWifiOffIcon = fixed.prototype;
export default lucideWifiOffIcon;
