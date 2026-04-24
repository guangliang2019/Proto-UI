// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'image-down' as const;
export const LUCIDE_IMAGE_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21',
  }),
  svg.path({ d: 'm14 19 3 3v-5.5' }),
  svg.path({ d: 'm17 22 3-3' }),
  svg.circle({ cx: 9, cy: 9, r: 2 }),
];

export function renderLucideImageDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_IMAGE_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-image-down-icon',
  prototypeName: 'lucide-image-down-icon',
  shapeFactory: LUCIDE_IMAGE_DOWN_SHAPE_FACTORY,
});

export const asLucideImageDownIcon = fixed.asHook;
export const lucideImageDownIcon = fixed.prototype;
export default lucideImageDownIcon;
