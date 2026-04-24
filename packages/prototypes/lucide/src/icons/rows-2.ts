// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rows-2' as const;
export const LUCIDE_ROWS_2_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M3 12h18' }),
];

export function renderLucideRows2Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROWS_2_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rows-2-icon',
  prototypeName: 'lucide-rows-2-icon',
  shapeFactory: LUCIDE_ROWS_2_SHAPE_FACTORY,
});

export const asLucideRows2Icon = fixed.asHook;
export const lucideRows2Icon = fixed.prototype;
export default lucideRows2Icon;
