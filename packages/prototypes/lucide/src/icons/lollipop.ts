// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'lollipop' as const;
export const LUCIDE_LOLLIPOP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 11, cy: 11, r: 8 }),
  svg.path({ d: 'm21 21-4.3-4.3' }),
  svg.path({ d: 'M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0' }),
];

export function renderLucideLollipopIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LOLLIPOP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-lollipop-icon',
  prototypeName: 'lucide-lollipop-icon',
  shapeFactory: LUCIDE_LOLLIPOP_SHAPE_FACTORY,
});

export const asLucideLollipopIcon = fixed.asHook;
export const lucideLollipopIcon = fixed.prototype;
export default lucideLollipopIcon;
