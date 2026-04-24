// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'dices' as const;
export const LUCIDE_DICES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 12, height: 12, x: 2, y: 10, rx: 2, ry: 2 }),
  svg.path({ d: 'm17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6' }),
  svg.path({ d: 'M6 18h.01' }),
  svg.path({ d: 'M10 14h.01' }),
  svg.path({ d: 'M15 6h.01' }),
  svg.path({ d: 'M18 9h.01' }),
];

export function renderLucideDicesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DICES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-dices-icon',
  prototypeName: 'lucide-dices-icon',
  shapeFactory: LUCIDE_DICES_SHAPE_FACTORY,
});

export const asLucideDicesIcon = fixed.asHook;
export const lucideDicesIcon = fixed.prototype;
export default lucideDicesIcon;
