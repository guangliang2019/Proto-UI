// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'signal-zero' as const;
export const LUCIDE_SIGNAL_ZERO_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M2 20h.01' });

export function renderLucideSignalZeroIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SIGNAL_ZERO_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-signal-zero-icon',
  prototypeName: 'lucide-signal-zero-icon',
  shapeFactory: LUCIDE_SIGNAL_ZERO_SHAPE_FACTORY,
});

export const asLucideSignalZeroIcon = fixed.asHook;
export const lucideSignalZeroIcon = fixed.prototype;
export default lucideSignalZeroIcon;
