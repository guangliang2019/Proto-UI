// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'slice' as const;
export const LUCIDE_SLICE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({
    d: 'M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14',
  });

export function renderLucideSliceIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SLICE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-slice-icon',
  prototypeName: 'lucide-slice-icon',
  shapeFactory: LUCIDE_SLICE_SHAPE_FACTORY,
});

export const asLucideSliceIcon = fixed.asHook;
export const lucideSliceIcon = fixed.prototype;
export default lucideSliceIcon;
