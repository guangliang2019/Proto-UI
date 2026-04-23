// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'crop' as const;
export const LUCIDE_CROP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 2v14a2 2 0 0 0 2 2h14' }),
  svg.path({ d: 'M18 22V8a2 2 0 0 0-2-2H2' }),
];

export function renderLucideCropIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CROP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-crop-icon',
  prototypeName: 'lucide-crop-icon',
  shapeFactory: LUCIDE_CROP_SHAPE_FACTORY,
});

export const asLucideCropIcon = fixed.asHook;
export const lucideCropIcon = fixed.prototype;
export default lucideCropIcon;
