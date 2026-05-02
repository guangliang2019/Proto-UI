// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square' as const;
export const LUCIDE_SQUARE_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 });

export function renderLucideSquareIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-icon',
  prototypeName: 'lucide-square-icon',
  shapeFactory: LUCIDE_SQUARE_SHAPE_FACTORY,
});

export const asLucideSquareIcon = fixed.asHook;
export const lucideSquareIcon = fixed.prototype;
export default lucideSquareIcon;
