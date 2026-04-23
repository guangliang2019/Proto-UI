// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'step-forward' as const;
export const LUCIDE_STEP_FORWARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z',
  }),
  svg.path({ d: 'M3 4v16' }),
];

export function renderLucideStepForwardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_STEP_FORWARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-step-forward-icon',
  prototypeName: 'lucide-step-forward-icon',
  shapeFactory: LUCIDE_STEP_FORWARD_SHAPE_FACTORY,
});

export const asLucideStepForwardIcon = fixed.asHook;
export const lucideStepForwardIcon = fixed.prototype;
export default lucideStepForwardIcon;
