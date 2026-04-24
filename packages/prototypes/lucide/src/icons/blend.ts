// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'blend' as const;
export const LUCIDE_BLEND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 9, cy: 9, r: 7 }),
  svg.circle({ cx: 15, cy: 15, r: 7 }),
];

export function renderLucideBlendIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BLEND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-blend-icon',
  prototypeName: 'lucide-blend-icon',
  shapeFactory: LUCIDE_BLEND_SHAPE_FACTORY,
});

export const asLucideBlendIcon = fixed.asHook;
export const lucideBlendIcon = fixed.prototype;
export default lucideBlendIcon;
