// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rows-3' as const;
export const LUCIDE_ROWS_3_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M21 9H3' }),
  svg.path({ d: 'M21 15H3' }),
];

export function renderLucideRows3Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROWS_3_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rows-3-icon',
  prototypeName: 'lucide-rows-3-icon',
  shapeFactory: LUCIDE_ROWS_3_SHAPE_FACTORY,
});

export const asLucideRows3Icon = fixed.asHook;
export const lucideRows3Icon = fixed.prototype;
export default lucideRows3Icon;
