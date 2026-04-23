// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud' as const;
export const LUCIDE_CLOUD_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' });

export function renderLucideCloudIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-icon',
  prototypeName: 'lucide-cloud-icon',
  shapeFactory: LUCIDE_CLOUD_SHAPE_FACTORY,
});

export const asLucideCloudIcon = fixed.asHook;
export const lucideCloudIcon = fixed.prototype;
export default lucideCloudIcon;
