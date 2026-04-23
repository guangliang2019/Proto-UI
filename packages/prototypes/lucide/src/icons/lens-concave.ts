// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lens-concave' as const;
export const LUCIDE_LENS_CONCAVE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M7 2a1 1 0 0 0-.8 1.6 14 14 0 0 1 0 16.8A1 1 0 0 0 7 22h10a1 1 0 0 0 .8-1.6 14 14 0 0 1 0-16.8A1 1 0 0 0 17 2z',
  });

export function renderLucideLensConcaveIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LENS_CONCAVE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lens-concave-icon',
  prototypeName: 'lucide-lens-concave-icon',
  shapeFactory: LUCIDE_LENS_CONCAVE_SHAPE_FACTORY,
});

export const asLucideLensConcaveIcon = fixed.asHook;
export const lucideLensConcaveIcon = fixed.prototype;
export default lucideLensConcaveIcon;
