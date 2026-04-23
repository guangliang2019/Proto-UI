// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'ruler' as const;
export const LUCIDE_RULER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z',
  }),
  svg.path({ d: 'm14.5 12.5 2-2' }),
  svg.path({ d: 'm11.5 9.5 2-2' }),
  svg.path({ d: 'm8.5 6.5 2-2' }),
  svg.path({ d: 'm17.5 15.5 2-2' }),
];

export function renderLucideRulerIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RULER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-ruler-icon',
  prototypeName: 'lucide-ruler-icon',
  shapeFactory: LUCIDE_RULER_SHAPE_FACTORY,
});

export const asLucideRulerIcon = fixed.asHook;
export const lucideRulerIcon = fixed.prototype;
export default lucideRulerIcon;
