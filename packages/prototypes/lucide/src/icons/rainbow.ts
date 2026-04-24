// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rainbow' as const;
export const LUCIDE_RAINBOW_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 17a10 10 0 0 0-20 0' }),
  svg.path({ d: 'M6 17a6 6 0 0 1 12 0' }),
  svg.path({ d: 'M10 17a2 2 0 0 1 4 0' }),
];

export function renderLucideRainbowIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_RAINBOW_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rainbow-icon',
  prototypeName: 'lucide-rainbow-icon',
  shapeFactory: LUCIDE_RAINBOW_SHAPE_FACTORY,
});

export const asLucideRainbowIcon = fixed.asHook;
export const lucideRainbowIcon = fixed.prototype;
export default lucideRainbowIcon;
