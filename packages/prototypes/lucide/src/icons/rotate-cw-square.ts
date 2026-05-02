// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rotate-cw-square' as const;
export const LUCIDE_ROTATE_CW_SQUARE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 5H6a2 2 0 0 0-2 2v3' }),
  svg.path({ d: 'm9 8 3-3-3-3' }),
  svg.path({ d: 'M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2' }),
];

export function renderLucideRotateCwSquareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROTATE_CW_SQUARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rotate-cw-square-icon',
  prototypeName: 'lucide-rotate-cw-square-icon',
  shapeFactory: LUCIDE_ROTATE_CW_SQUARE_SHAPE_FACTORY,
});

export const asLucideRotateCwSquareIcon = fixed.asHook;
export const lucideRotateCwSquareIcon = fixed.prototype;
export default lucideRotateCwSquareIcon;
