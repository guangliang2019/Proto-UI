// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-function' as const;
export const LUCIDE_SQUARE_FUNCTION_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
  svg.path({ d: 'M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3' }),
  svg.path({ d: 'M9 11.2h5.7' }),
];

export function renderLucideSquareFunctionIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_FUNCTION_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-function-icon',
  prototypeName: 'lucide-square-function-icon',
  shapeFactory: LUCIDE_SQUARE_FUNCTION_SHAPE_FACTORY,
});

export const asLucideSquareFunctionIcon = fixed.asHook;
export const lucideSquareFunctionIcon = fixed.prototype;
export default lucideSquareFunctionIcon;
