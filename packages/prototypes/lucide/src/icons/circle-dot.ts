// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-dot' as const;
export const LUCIDE_CIRCLE_DOT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.circle({ cx: 12, cy: 12, r: 1 }),
];

export function renderLucideCircleDotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_DOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-dot-icon',
  prototypeName: 'lucide-circle-dot-icon',
  shapeFactory: LUCIDE_CIRCLE_DOT_SHAPE_FACTORY,
});

export const asLucideCircleDotIcon = fixed.asHook;
export const lucideCircleDotIcon = fixed.prototype;
export default lucideCircleDotIcon;
