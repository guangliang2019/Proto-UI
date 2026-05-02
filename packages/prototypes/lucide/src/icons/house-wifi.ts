// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'house-wifi' as const;
export const LUCIDE_HOUSE_WIFI_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M9.5 13.866a4 4 0 0 1 5 .01' }),
  svg.path({ d: 'M12 17h.01' }),
  svg.path({
    d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
  }),
  svg.path({ d: 'M7 10.754a8 8 0 0 1 10 0' }),
];

export function renderLucideHouseWifiIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HOUSE_WIFI_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-house-wifi-icon',
  prototypeName: 'lucide-house-wifi-icon',
  shapeFactory: LUCIDE_HOUSE_WIFI_SHAPE_FACTORY,
});

export const asLucideHouseWifiIcon = fixed.asHook;
export const lucideHouseWifiIcon = fixed.prototype;
export default lucideHouseWifiIcon;
