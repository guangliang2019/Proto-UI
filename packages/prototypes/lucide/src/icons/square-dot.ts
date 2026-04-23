// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-dot' as const;
export const LUCIDE_SQUARE_DOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.circle({ cx: 12, cy: 12, r: 1 }),
];

export function renderLucideSquareDotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_DOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-dot-icon',
  prototypeName: 'lucide-square-dot-icon',
  shapeFactory: LUCIDE_SQUARE_DOT_SHAPE_FACTORY,
});

export const asLucideSquareDotIcon = fixed.asHook;
export const lucideSquareDotIcon = fixed.prototype;
export default lucideSquareDotIcon;
