// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'iteration-ccw' as const;
export const LUCIDE_ITERATION_CCW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 14 4 4-4 4' }),
  svg.path({ d: 'M20 10a8 8 0 1 0-8 8h8' }),
];

export function renderLucideIterationCcwIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ITERATION_CCW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-iteration-ccw-icon',
  prototypeName: 'lucide-iteration-ccw-icon',
  shapeFactory: LUCIDE_ITERATION_CCW_SHAPE_FACTORY,
});

export const asLucideIterationCcwIcon = fixed.asHook;
export const lucideIterationCcwIcon = fixed.prototype;
export default lucideIterationCcwIcon;
