// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-code' as const;
export const LUCIDE_SQUARE_CODE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10 9-3 3 3 3' }),
  svg.path({ d: 'm14 15 3-3-3-3' }),
  svg.rect({ x: 3, y: 3, width: 18, height: 18, rx: 2 }),
];

export function renderLucideSquareCodeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_CODE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-code-icon',
  prototypeName: 'lucide-square-code-icon',
  shapeFactory: LUCIDE_SQUARE_CODE_SHAPE_FACTORY,
});

export const asLucideSquareCodeIcon = fixed.asHook;
export const lucideSquareCodeIcon = fixed.prototype;
export default lucideSquareCodeIcon;
