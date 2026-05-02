// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-lightning' as const;
export const LUCIDE_CLOUD_LIGHTNING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973' }),
  svg.path({ d: 'm13 12-3 5h4l-3 5' }),
];

export function renderLucideCloudLightningIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_LIGHTNING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-lightning-icon',
  prototypeName: 'lucide-cloud-lightning-icon',
  shapeFactory: LUCIDE_CLOUD_LIGHTNING_SHAPE_FACTORY,
});

export const asLucideCloudLightningIcon = fixed.asHook;
export const lucideCloudLightningIcon = fixed.prototype;
export default lucideCloudLightningIcon;
