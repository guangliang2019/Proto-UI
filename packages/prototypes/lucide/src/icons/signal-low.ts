// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'signal-low' as const;
export const LUCIDE_SIGNAL_LOW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 20h.01' }),
  svg.path({ d: 'M7 20v-4' }),
];

export function renderLucideSignalLowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SIGNAL_LOW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-signal-low-icon',
  prototypeName: 'lucide-signal-low-icon',
  shapeFactory: LUCIDE_SIGNAL_LOW_SHAPE_FACTORY,
});

export const asLucideSignalLowIcon = fixed.asHook;
export const lucideSignalLowIcon = fixed.prototype;
export default lucideSignalLowIcon;
