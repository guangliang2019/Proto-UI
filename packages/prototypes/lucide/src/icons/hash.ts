// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'hash' as const;
export const LUCIDE_HASH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.line({ x1: 4, x2: 20, y1: 9, y2: 9 }),
  svg.line({ x1: 4, x2: 20, y1: 15, y2: 15 }),
  svg.line({ x1: 10, x2: 8, y1: 3, y2: 21 }),
  svg.line({ x1: 16, x2: 14, y1: 3, y2: 21 }),
];

export function renderLucideHashIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HASH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-hash-icon',
  prototypeName: 'lucide-hash-icon',
  shapeFactory: LUCIDE_HASH_SHAPE_FACTORY,
});

export const asLucideHashIcon = fixed.asHook;
export const lucideHashIcon = fixed.prototype;
export default lucideHashIcon;
