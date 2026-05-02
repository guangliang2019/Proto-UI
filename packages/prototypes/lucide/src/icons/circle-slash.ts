// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-slash' as const;
export const LUCIDE_CIRCLE_SLASH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.line({ x1: 9, x2: 15, y1: 15, y2: 9 }),
];

export function renderLucideCircleSlashIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_SLASH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-slash-icon',
  prototypeName: 'lucide-circle-slash-icon',
  shapeFactory: LUCIDE_CIRCLE_SLASH_SHAPE_FACTORY,
});

export const asLucideCircleSlashIcon = fixed.asHook;
export const lucideCircleSlashIcon = fixed.prototype;
export default lucideCircleSlashIcon;
