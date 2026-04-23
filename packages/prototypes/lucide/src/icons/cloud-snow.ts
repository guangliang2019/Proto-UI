// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-snow' as const;
export const LUCIDE_CLOUD_SNOW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }),
  svg.path({ d: 'M8 15h.01' }),
  svg.path({ d: 'M8 19h.01' }),
  svg.path({ d: 'M12 17h.01' }),
  svg.path({ d: 'M12 21h.01' }),
  svg.path({ d: 'M16 15h.01' }),
  svg.path({ d: 'M16 19h.01' }),
];

export function renderLucideCloudSnowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_SNOW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-snow-icon',
  prototypeName: 'lucide-cloud-snow-icon',
  shapeFactory: LUCIDE_CLOUD_SNOW_SHAPE_FACTORY,
});

export const asLucideCloudSnowIcon = fixed.asHook;
export const lucideCloudSnowIcon = fixed.prototype;
export default lucideCloudSnowIcon;
