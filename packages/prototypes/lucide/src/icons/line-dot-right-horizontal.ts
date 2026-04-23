// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'line-dot-right-horizontal' as const;
export const LUCIDE_LINE_DOT_RIGHT_HORIZONTAL_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M 3 12 L 15 12' }),
  svg.circle({ cx: 18, cy: 12, r: 3 }),
];

export function renderLucideLineDotRightHorizontalIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LINE_DOT_RIGHT_HORIZONTAL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-line-dot-right-horizontal-icon',
  prototypeName: 'lucide-line-dot-right-horizontal-icon',
  shapeFactory: LUCIDE_LINE_DOT_RIGHT_HORIZONTAL_SHAPE_FACTORY,
});

export const asLucideLineDotRightHorizontalIcon = fixed.asHook;
export const lucideLineDotRightHorizontalIcon = fixed.prototype;
export default lucideLineDotRightHorizontalIcon;
