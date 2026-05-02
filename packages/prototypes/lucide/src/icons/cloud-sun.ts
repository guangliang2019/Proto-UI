// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-sun' as const;
export const LUCIDE_CLOUD_SUN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 2v2' }),
  svg.path({ d: 'm4.93 4.93 1.41 1.41' }),
  svg.path({ d: 'M20 12h2' }),
  svg.path({ d: 'm19.07 4.93-1.41 1.41' }),
  svg.path({ d: 'M15.947 12.65a4 4 0 0 0-5.925-4.128' }),
  svg.path({ d: 'M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z' }),
];

export function renderLucideCloudSunIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_SUN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-sun-icon',
  prototypeName: 'lucide-cloud-sun-icon',
  shapeFactory: LUCIDE_CLOUD_SUN_SHAPE_FACTORY,
});

export const asLucideCloudSunIcon = fixed.asHook;
export const lucideCloudSunIcon = fixed.prototype;
export default lucideCloudSunIcon;
