// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-check' as const;
export const LUCIDE_CLOUD_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm17 15-5.5 5.5L9 18' }),
  svg.path({ d: 'M5.516 16.07A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 3.501 7.327' }),
];

export function renderLucideCloudCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-check-icon',
  prototypeName: 'lucide-cloud-check-icon',
  shapeFactory: LUCIDE_CLOUD_CHECK_SHAPE_FACTORY,
});

export const asLucideCloudCheckIcon = fixed.asHook;
export const lucideCloudCheckIcon = fixed.prototype;
export default lucideCloudCheckIcon;
