// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'swords' as const;
export const LUCIDE_SWORDS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.polyline({ points: '14.5 17.5 3 6 3 3 6 3 17.5 14.5' }),
  svg.line({ x1: 13, x2: 19, y1: 19, y2: 13 }),
  svg.line({ x1: 16, x2: 20, y1: 16, y2: 20 }),
  svg.line({ x1: 19, x2: 21, y1: 21, y2: 19 }),
  svg.polyline({ points: '14.5 6.5 18 3 21 3 21 6 17.5 9.5' }),
  svg.line({ x1: 5, x2: 9, y1: 14, y2: 18 }),
  svg.line({ x1: 7, x2: 4, y1: 17, y2: 20 }),
  svg.line({ x1: 3, x2: 5, y1: 19, y2: 21 }),
];

export function renderLucideSwordsIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SWORDS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-swords-icon',
  prototypeName: 'lucide-swords-icon',
  shapeFactory: LUCIDE_SWORDS_SHAPE_FACTORY,
});

export const asLucideSwordsIcon = fixed.asHook;
export const lucideSwordsIcon = fixed.prototype;
export default lucideSwordsIcon;
