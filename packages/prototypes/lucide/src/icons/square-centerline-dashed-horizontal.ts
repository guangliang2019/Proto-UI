// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-centerline-dashed-horizontal' as const;
export const LUCIDE_SQUARE_CENTERLINE_DASHED_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (
  svg
) => [
  svg.path({ d: 'M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3' }),
  svg.path({ d: 'M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3' }),
  svg.path({ d: 'M12 20v2' }),
  svg.path({ d: 'M12 14v2' }),
  svg.path({ d: 'M12 8v2' }),
  svg.path({ d: 'M12 2v2' }),
];

export function renderLucideSquareCenterlineDashedHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(
    renderer,
    LUCIDE_SQUARE_CENTERLINE_DASHED_HORIZONTAL_SHAPE_FACTORY,
    options
  );
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-centerline-dashed-horizontal-icon',
  prototypeName: 'lucide-square-centerline-dashed-horizontal-icon',
  shapeFactory: LUCIDE_SQUARE_CENTERLINE_DASHED_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideSquareCenterlineDashedHorizontalIcon = fixed.asHook;
export const lucideSquareCenterlineDashedHorizontalIcon = fixed.prototype;
export default lucideSquareCenterlineDashedHorizontalIcon;
