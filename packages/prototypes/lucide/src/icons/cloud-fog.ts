// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-fog' as const;
export const LUCIDE_CLOUD_FOG_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }),
  svg.path({ d: 'M16 17H7' }),
  svg.path({ d: 'M17 21H9' }),
];

export function renderLucideCloudFogIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_FOG_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-fog-icon',
  prototypeName: 'lucide-cloud-fog-icon',
  shapeFactory: LUCIDE_CLOUD_FOG_SHAPE_FACTORY,
});

export const asLucideCloudFogIcon = fixed.asHook;
export const lucideCloudFogIcon = fixed.prototype;
export default lucideCloudFogIcon;
