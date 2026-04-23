// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-sigma' as const;
export const LUCIDE_SQUARE_SIGMA_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M16 8.9V7H8l4 5-4 5h8v-1.9' }),
];

export function renderLucideSquareSigmaIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_SIGMA_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-sigma-icon',
  prototypeName: 'lucide-square-sigma-icon',
  shapeFactory: LUCIDE_SQUARE_SIGMA_SHAPE_FACTORY,
});

export const asLucideSquareSigmaIcon = fixed.asHook;
export const lucideSquareSigmaIcon = fixed.prototype;
export default lucideSquareSigmaIcon;
