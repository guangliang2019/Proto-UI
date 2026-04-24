// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wifi-pen' as const;
export const LUCIDE_WIFI_PEN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 8.82a15 15 0 0 1 20 0' }),
  svg.path({
    d: 'M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z',
  }),
  svg.path({ d: 'M5 12.859a10 10 0 0 1 10.5-2.222' }),
  svg.path({ d: 'M8.5 16.429a5 5 0 0 1 3-1.406' }),
];

export function renderLucideWifiPenIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WIFI_PEN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wifi-pen-icon',
  prototypeName: 'lucide-wifi-pen-icon',
  shapeFactory: LUCIDE_WIFI_PEN_SHAPE_FACTORY,
});

export const asLucideWifiPenIcon = fixed.asHook;
export const lucideWifiPenIcon = fixed.prototype;
export default lucideWifiPenIcon;
