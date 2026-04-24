// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'smile-plus' as const;
export const LUCIDE_SMILE_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 11v1a10 10 0 1 1-9-10' }),
  svg.path({ d: 'M8 14s1.5 2 4 2 4-2 4-2' }),
  svg.line({ x1: 9, x2: 9.01, y1: 9, y2: 9 }),
  svg.line({ x1: 15, x2: 15.01, y1: 9, y2: 9 }),
  svg.path({ d: 'M16 5h6' }),
  svg.path({ d: 'M19 2v6' }),
];

export function renderLucideSmilePlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SMILE_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-smile-plus-icon',
  prototypeName: 'lucide-smile-plus-icon',
  shapeFactory: LUCIDE_SMILE_PLUS_SHAPE_FACTORY,
});

export const asLucideSmilePlusIcon = fixed.asHook;
export const lucideSmilePlusIcon = fixed.prototype;
export default lucideSmilePlusIcon;
