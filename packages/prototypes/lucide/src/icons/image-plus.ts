// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'image-plus' as const;
export const LUCIDE_IMAGE_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 5h6' }),
  svg.path({ d: 'M19 2v6' }),
  svg.path({ d: 'M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5' }),
  svg.path({ d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' }),
  svg.circle({ cx: 9, cy: 9, r: 2 }),
];

export function renderLucideImagePlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_IMAGE_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-image-plus-icon',
  prototypeName: 'lucide-image-plus-icon',
  shapeFactory: LUCIDE_IMAGE_PLUS_SHAPE_FACTORY,
});

export const asLucideImagePlusIcon = fixed.asHook;
export const lucideImagePlusIcon = fixed.prototype;
export default lucideImagePlusIcon;
