// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wifi-zero' as const;
export const LUCIDE_WIFI_ZERO_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M12 20h.01' });

export function renderLucideWifiZeroIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WIFI_ZERO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wifi-zero-icon',
  prototypeName: 'lucide-wifi-zero-icon',
  shapeFactory: LUCIDE_WIFI_ZERO_SHAPE_FACTORY,
});

export const asLucideWifiZeroIcon = fixed.asHook;
export const lucideWifiZeroIcon = fixed.prototype;
export default lucideWifiZeroIcon;
