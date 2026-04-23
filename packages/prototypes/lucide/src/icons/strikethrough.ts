// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'strikethrough' as const;
export const LUCIDE_STRIKETHROUGH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 4H9a3 3 0 0 0-2.83 4' }),
  svg.path({ d: 'M14 12a4 4 0 0 1 0 8H6' }),
  svg.line({ x1: 4, x2: 20, y1: 12, y2: 12 }),
];

export function renderLucideStrikethroughIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_STRIKETHROUGH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-strikethrough-icon',
  prototypeName: 'lucide-strikethrough-icon',
  shapeFactory: LUCIDE_STRIKETHROUGH_SHAPE_FACTORY,
});

export const asLucideStrikethroughIcon = fixed.asHook;
export const lucideStrikethroughIcon = fixed.prototype;
export default lucideStrikethroughIcon;
