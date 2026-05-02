// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sheet' as const;
export const LUCIDE_SHEET_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
  svg.line({ x1: 3, x2: 21, y1: 9, y2: 9 }),
  svg.line({ x1: 3, x2: 21, y1: 15, y2: 15 }),
  svg.line({ x1: 9, x2: 9, y1: 9, y2: 21 }),
  svg.line({ x1: 15, x2: 15, y1: 9, y2: 21 }),
];

export function renderLucideSheetIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SHEET_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sheet-icon',
  prototypeName: 'lucide-sheet-icon',
  shapeFactory: LUCIDE_SHEET_SHAPE_FACTORY,
});

export const asLucideSheetIcon = fixed.asHook;
export const lucideSheetIcon = fixed.prototype;
export default lucideSheetIcon;
