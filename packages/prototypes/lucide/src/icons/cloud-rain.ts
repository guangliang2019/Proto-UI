// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-rain' as const;
export const LUCIDE_CLOUD_RAIN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }),
  svg.path({ d: 'M16 14v6' }),
  svg.path({ d: 'M8 14v6' }),
  svg.path({ d: 'M12 16v6' }),
];

export function renderLucideCloudRainIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_RAIN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-rain-icon',
  prototypeName: 'lucide-cloud-rain-icon',
  shapeFactory: LUCIDE_CLOUD_RAIN_SHAPE_FACTORY,
});

export const asLucideCloudRainIcon = fixed.asHook;
export const lucideCloudRainIcon = fixed.prototype;
export default lucideCloudRainIcon;
