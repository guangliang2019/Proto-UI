// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'smile' as const;
export const LUCIDE_SMILE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M8 14s1.5 2 4 2 4-2 4-2' }),
  svg.line({ x1: 9, x2: 9.01, y1: 9, y2: 9 }),
  svg.line({ x1: 15, x2: 15.01, y1: 9, y2: 9 }),
];

export function renderLucideSmileIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SMILE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-smile-icon',
  prototypeName: 'lucide-smile-icon',
  shapeFactory: LUCIDE_SMILE_SHAPE_FACTORY,
});

export const asLucideSmileIcon = fixed.asHook;
export const lucideSmileIcon = fixed.prototype;
export default lucideSmileIcon;
