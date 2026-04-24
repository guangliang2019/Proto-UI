// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-radical' as const;
export const LUCIDE_SQUARE_RADICAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M7 12h2l2 5 2-10h4' }),
  svg.rect({ x: 3, y: 3, width: 18, height: 18, rx: 2 }),
];

export function renderLucideSquareRadicalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_RADICAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-radical-icon',
  prototypeName: 'lucide-square-radical-icon',
  shapeFactory: LUCIDE_SQUARE_RADICAL_SHAPE_FACTORY,
});

export const asLucideSquareRadicalIcon = fixed.asHook;
export const lucideSquareRadicalIcon = fixed.prototype;
export default lucideSquareRadicalIcon;
