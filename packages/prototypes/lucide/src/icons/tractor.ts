// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'tractor' as const;
export const LUCIDE_TRACTOR_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20' }),
  svg.path({ d: 'M16 18h-5' }),
  svg.path({ d: 'M18 5a1 1 0 0 0-1 1v5.573' }),
  svg.path({ d: 'M3 4h8.129a1 1 0 0 1 .99.863L13 11.246' }),
  svg.path({ d: 'M4 11V4' }),
  svg.path({ d: 'M7 15h.01' }),
  svg.path({ d: 'M8 10.1V4' }),
  svg.circle({ cx: 18, cy: 18, r: 2 }),
  svg.circle({ cx: 7, cy: 15, r: 5 }),
];

export function renderLucideTractorIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TRACTOR_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-tractor-icon',
  prototypeName: 'lucide-tractor-icon',
  shapeFactory: LUCIDE_TRACTOR_SHAPE_FACTORY,
});

export const asLucideTractorIcon = fixed.asHook;
export const lucideTractorIcon = fixed.prototype;
export default lucideTractorIcon;
