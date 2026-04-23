// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'layers-2' as const;
export const LUCIDE_LAYERS_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z',
  }),
  svg.path({
    d: 'm20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845',
  }),
];

export function renderLucideLayers2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAYERS_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-layers-2-icon',
  prototypeName: 'lucide-layers-2-icon',
  shapeFactory: LUCIDE_LAYERS_2_SHAPE_FACTORY,
});

export const asLucideLayers2Icon = fixed.asHook;
export const lucideLayers2Icon = fixed.prototype;
export default lucideLayers2Icon;
