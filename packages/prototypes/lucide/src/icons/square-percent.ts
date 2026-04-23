// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-percent' as const;
export const LUCIDE_SQUARE_PERCENT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'm15 9-6 6' }),
  svg.path({ d: 'M9 9h.01' }),
  svg.path({ d: 'M15 15h.01' }),
];

export function renderLucideSquarePercentIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_PERCENT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-percent-icon',
  prototypeName: 'lucide-square-percent-icon',
  shapeFactory: LUCIDE_SQUARE_PERCENT_SHAPE_FACTORY,
});

export const asLucideSquarePercentIcon = fixed.asHook;
export const lucideSquarePercentIcon = fixed.prototype;
export default lucideSquarePercentIcon;
