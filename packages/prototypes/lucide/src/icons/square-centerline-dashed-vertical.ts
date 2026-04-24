// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-centerline-dashed-vertical' as const;
export const LUCIDE_SQUARE_CENTERLINE_DASHED_VERTICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3' }),
  svg.path({ d: 'M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3' }),
  svg.path({ d: 'M4 12H2' }),
  svg.path({ d: 'M10 12H8' }),
  svg.path({ d: 'M16 12h-2' }),
  svg.path({ d: 'M22 12h-2' }),
];

export function renderLucideSquareCenterlineDashedVerticalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(
    renderer,
    LUCIDE_SQUARE_CENTERLINE_DASHED_VERTICAL_SHAPE_FACTORY,
    options
  );
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-centerline-dashed-vertical-icon',
  prototypeName: 'lucide-square-centerline-dashed-vertical-icon',
  shapeFactory: LUCIDE_SQUARE_CENTERLINE_DASHED_VERTICAL_SHAPE_FACTORY,
});

export const asLucideSquareCenterlineDashedVerticalIcon = fixed.asHook;
export const lucideSquareCenterlineDashedVerticalIcon = fixed.prototype;
export default lucideSquareCenterlineDashedVerticalIcon;
