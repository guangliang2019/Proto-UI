// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'gpu' as const;
export const LUCIDE_GPU_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 17h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2' }),
  svg.path({ d: 'M2 21V3' }),
  svg.path({ d: 'M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3' }),
  svg.circle({ cx: 16, cy: 11, r: 2 }),
  svg.circle({ cx: 8, cy: 11, r: 2 }),
];

export function renderLucideGpuIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_GPU_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-gpu-icon',
  prototypeName: 'lucide-gpu-icon',
  shapeFactory: LUCIDE_GPU_SHAPE_FACTORY,
});

export const asLucideGpuIcon = fixed.asHook;
export const lucideGpuIcon = fixed.prototype;
export default lucideGpuIcon;
