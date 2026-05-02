// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'iteration-cw' as const;
export const LUCIDE_ITERATION_CW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 10a8 8 0 1 1 8 8H4' }),
  svg.path({ d: 'm8 22-4-4 4-4' }),
];

export function renderLucideIterationCwIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ITERATION_CW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-iteration-cw-icon',
  prototypeName: 'lucide-iteration-cw-icon',
  shapeFactory: LUCIDE_ITERATION_CW_SHAPE_FACTORY,
});

export const asLucideIterationCwIcon = fixed.asHook;
export const lucideIterationCwIcon = fixed.prototype;
export default lucideIterationCwIcon;
