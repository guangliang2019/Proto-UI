// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'underline' as const;
export const LUCIDE_UNDERLINE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M6 4v6a6 6 0 0 0 12 0V4' }),
  svg.line({ x1: 4, x2: 20, y1: 20, y2: 20 }),
];

export function renderLucideUnderlineIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_UNDERLINE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-underline-icon',
  prototypeName: 'lucide-underline-icon',
  shapeFactory: LUCIDE_UNDERLINE_SHAPE_FACTORY,
});

export const asLucideUnderlineIcon = fixed.asHook;
export const lucideUnderlineIcon = fixed.prototype;
export default lucideUnderlineIcon;
