// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'forward' as const;
export const LUCIDE_FORWARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm15 17 5-5-5-5' }),
  svg.path({ d: 'M4 18v-2a4 4 0 0 1 4-4h12' }),
];

export function renderLucideForwardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FORWARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-forward-icon',
  prototypeName: 'lucide-forward-icon',
  shapeFactory: LUCIDE_FORWARD_SHAPE_FACTORY,
});

export const asLucideForwardIcon = fixed.asHook;
export const lucideForwardIcon = fixed.prototype;
export default lucideForwardIcon;
