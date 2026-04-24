// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'turtle' as const;
export const LUCIDE_TURTLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z',
  }),
  svg.path({ d: 'M4.82 7.9 8 10' }),
  svg.path({ d: 'M15.18 7.9 12 10' }),
  svg.path({ d: 'M16.93 10H20a2 2 0 0 1 0 4H2' }),
];

export function renderLucideTurtleIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TURTLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-turtle-icon',
  prototypeName: 'lucide-turtle-icon',
  shapeFactory: LUCIDE_TURTLE_SHAPE_FACTORY,
});

export const asLucideTurtleIcon = fixed.asHook;
export const lucideTurtleIcon = fixed.prototype;
export default lucideTurtleIcon;
