// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'heart-pulse' as const;
export const LUCIDE_HEART_PULSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5',
  }),
  svg.path({ d: 'M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27' }),
];

export function renderLucideHeartPulseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_HEART_PULSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-heart-pulse-icon',
  prototypeName: 'lucide-heart-pulse-icon',
  shapeFactory: LUCIDE_HEART_PULSE_SHAPE_FACTORY,
});

export const asLucideHeartPulseIcon = fixed.asHook;
export const lucideHeartPulseIcon = fixed.prototype;
export default lucideHeartPulseIcon;
