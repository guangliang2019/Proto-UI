// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rows-4' as const;
export const LUCIDE_ROWS_4_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M21 7.5H3' }),
  svg.path({ d: 'M21 12H3' }),
  svg.path({ d: 'M21 16.5H3' }),
];

export function renderLucideRows4Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROWS_4_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rows-4-icon',
  prototypeName: 'lucide-rows-4-icon',
  shapeFactory: LUCIDE_ROWS_4_SHAPE_FACTORY,
});

export const asLucideRows4Icon = fixed.asHook;
export const lucideRows4Icon = fixed.prototype;
export default lucideRows4Icon;
