// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-rain-wind' as const;
export const LUCIDE_CLOUD_RAIN_WIND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }),
  svg.path({ d: 'm9.2 22 3-7' }),
  svg.path({ d: 'm9 13-3 7' }),
  svg.path({ d: 'm17 13-3 7' }),
];

export function renderLucideCloudRainWindIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_RAIN_WIND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-rain-wind-icon',
  prototypeName: 'lucide-cloud-rain-wind-icon',
  shapeFactory: LUCIDE_CLOUD_RAIN_WIND_SHAPE_FACTORY,
});

export const asLucideCloudRainWindIcon = fixed.asHook;
export const lucideCloudRainWindIcon = fixed.prototype;
export default lucideCloudRainWindIcon;
