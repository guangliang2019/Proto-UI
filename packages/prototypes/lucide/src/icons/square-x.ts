// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-x' as const;
export const LUCIDE_SQUARE_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
  svg.path({ d: 'm15 9-6 6' }),
  svg.path({ d: 'm9 9 6 6' }),
];

export function renderLucideSquareXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-x-icon',
  prototypeName: 'lucide-square-x-icon',
  shapeFactory: LUCIDE_SQUARE_X_SHAPE_FACTORY,
});

export const asLucideSquareXIcon = fixed.asHook;
export const lucideSquareXIcon = fixed.prototype;
export default lucideSquareXIcon;
