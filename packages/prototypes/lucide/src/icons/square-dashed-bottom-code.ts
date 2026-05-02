// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-dashed-bottom-code' as const;
export const LUCIDE_SQUARE_DASHED_BOTTOM_CODE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M10 9.5 8 12l2 2.5' }),
  svg.path({ d: 'M14 21h1' }),
  svg.path({ d: 'm14 9.5 2 2.5-2 2.5' }),
  svg.path({ d: 'M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2' }),
  svg.path({ d: 'M9 21h1' }),
];

export function renderLucideSquareDashedBottomCodeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_DASHED_BOTTOM_CODE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-dashed-bottom-code-icon',
  prototypeName: 'lucide-square-dashed-bottom-code-icon',
  shapeFactory: LUCIDE_SQUARE_DASHED_BOTTOM_CODE_SHAPE_FACTORY,
});

export const asLucideSquareDashedBottomCodeIcon = fixed.asHook;
export const lucideSquareDashedBottomCodeIcon = fixed.prototype;
export default lucideSquareDashedBottomCodeIcon;
