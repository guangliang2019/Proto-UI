// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wifi' as const;
export const LUCIDE_WIFI_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 20h.01' }),
  svg.path({ d: 'M2 8.82a15 15 0 0 1 20 0' }),
  svg.path({ d: 'M5 12.859a10 10 0 0 1 14 0' }),
  svg.path({ d: 'M8.5 16.429a5 5 0 0 1 7 0' }),
];

export function renderLucideWifiIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WIFI_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wifi-icon',
  prototypeName: 'lucide-wifi-icon',
  shapeFactory: LUCIDE_WIFI_SHAPE_FACTORY,
});

export const asLucideWifiIcon = fixed.asHook;
export const lucideWifiIcon = fixed.prototype;
export default lucideWifiIcon;
