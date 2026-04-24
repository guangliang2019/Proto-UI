// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-slash' as const;
export const LUCIDE_SQUARE_SLASH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.line({ x1: 9, x2: 15, y1: 15, y2: 9 }),
];

export function renderLucideSquareSlashIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_SLASH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-slash-icon',
  prototypeName: 'lucide-square-slash-icon',
  shapeFactory: LUCIDE_SQUARE_SLASH_SHAPE_FACTORY,
});

export const asLucideSquareSlashIcon = fixed.asHook;
export const lucideSquareSlashIcon = fixed.prototype;
export default lucideSquareSlashIcon;
