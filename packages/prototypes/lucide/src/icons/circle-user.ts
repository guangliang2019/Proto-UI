// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-user' as const;
export const LUCIDE_CIRCLE_USER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.circle({ cx: 12, cy: 10, r: 3 }),
  svg.path({ d: 'M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662' }),
];

export function renderLucideCircleUserIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_USER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-user-icon',
  prototypeName: 'lucide-circle-user-icon',
  shapeFactory: LUCIDE_CIRCLE_USER_SHAPE_FACTORY,
});

export const asLucideCircleUserIcon = fixed.asHook;
export const lucideCircleUserIcon = fixed.prototype;
export default lucideCircleUserIcon;
