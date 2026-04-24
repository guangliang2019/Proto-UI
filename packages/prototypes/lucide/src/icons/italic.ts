// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'italic' as const;
export const LUCIDE_ITALIC_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 19, x2: 10, y1: 4, y2: 4 }),
  svg.line({ x1: 14, x2: 5, y1: 20, y2: 20 }),
  svg.line({ x1: 15, x2: 9, y1: 4, y2: 20 }),
];

export function renderLucideItalicIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ITALIC_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-italic-icon',
  prototypeName: 'lucide-italic-icon',
  shapeFactory: LUCIDE_ITALIC_SHAPE_FACTORY,
});

export const asLucideItalicIcon = fixed.asHook;
export const lucideItalicIcon = fixed.prototype;
export default lucideItalicIcon;
