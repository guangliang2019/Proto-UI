// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'droplets' as const;
export const LUCIDE_DROPLETS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z',
  }),
  svg.path({
    d: 'M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97',
  }),
];

export function renderLucideDropletsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DROPLETS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-droplets-icon',
  prototypeName: 'lucide-droplets-icon',
  shapeFactory: LUCIDE_DROPLETS_SHAPE_FACTORY,
});

export const asLucideDropletsIcon = fixed.asHook;
export const lucideDropletsIcon = fixed.prototype;
export default lucideDropletsIcon;
