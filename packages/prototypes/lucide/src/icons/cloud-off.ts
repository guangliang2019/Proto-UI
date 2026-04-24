// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'cloud-off' as const;
export const LUCIDE_CLOUD_OFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057' }),
  svg.path({ d: 'M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78' }),
  svg.path({ d: 'm2 2 20 20' }),
];

export function renderLucideCloudOffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CLOUD_OFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-cloud-off-icon',
  prototypeName: 'lucide-cloud-off-icon',
  shapeFactory: LUCIDE_CLOUD_OFF_SHAPE_FACTORY,
});

export const asLucideCloudOffIcon = fixed.asHook;
export const lucideCloudOffIcon = fixed.prototype;
export default lucideCloudOffIcon;
