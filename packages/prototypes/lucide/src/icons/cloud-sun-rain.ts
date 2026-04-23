// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-sun-rain' as const;
export const LUCIDE_CLOUD_SUN_RAIN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v2' }),
  svg.path({ d: 'm4.93 4.93 1.41 1.41' }),
  svg.path({ d: 'M20 12h2' }),
  svg.path({ d: 'm19.07 4.93-1.41 1.41' }),
  svg.path({ d: 'M15.947 12.65a4 4 0 0 0-5.925-4.128' }),
  svg.path({ d: 'M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24' }),
  svg.path({ d: 'M11 20v2' }),
  svg.path({ d: 'M7 19v2' }),
];

export function renderLucideCloudSunRainIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_SUN_RAIN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-sun-rain-icon',
  prototypeName: 'lucide-cloud-sun-rain-icon',
  shapeFactory: LUCIDE_CLOUD_SUN_RAIN_SHAPE_FACTORY,
});

export const asLucideCloudSunRainIcon = fixed.asHook;
export const lucideCloudSunRainIcon = fixed.prototype;
export default lucideCloudSunRainIcon;
