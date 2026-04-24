// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-moon-rain' as const;
export const LUCIDE_CLOUD_MOON_RAIN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M11 20v2' }),
  svg.path({
    d: 'M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36',
  }),
  svg.path({ d: 'M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24' }),
  svg.path({ d: 'M7 19v2' }),
];

export function renderLucideCloudMoonRainIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_MOON_RAIN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-moon-rain-icon',
  prototypeName: 'lucide-cloud-moon-rain-icon',
  shapeFactory: LUCIDE_CLOUD_MOON_RAIN_SHAPE_FACTORY,
});

export const asLucideCloudMoonRainIcon = fixed.asHook;
export const lucideCloudMoonRainIcon = fixed.prototype;
export default lucideCloudMoonRainIcon;
