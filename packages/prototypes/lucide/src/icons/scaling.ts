// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'scaling' as const;
export const LUCIDE_SCALING_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' }),
  svg.path({ d: 'M14 15H9v-5' }),
  svg.path({ d: 'M16 3h5v5' }),
  svg.path({ d: 'M21 3 9 15' }),
];

export function renderLucideScalingIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SCALING_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-scaling-icon',
  prototypeName: 'lucide-scaling-icon',
  shapeFactory: LUCIDE_SCALING_SHAPE_FACTORY,
});

export const asLucideScalingIcon = fixed.asHook;
export const lucideScalingIcon = fixed.prototype;
export default lucideScalingIcon;
