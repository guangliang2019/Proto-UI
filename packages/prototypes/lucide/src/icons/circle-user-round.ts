// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-user-round' as const;
export const LUCIDE_CIRCLE_USER_ROUND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M17.925 20.056a6 6 0 0 0-11.851.001' }),
  svg.circle({ cx: 12, cy: 11, r: 4 }),
  svg.circle({ cx: 12, cy: 12, r: 10 }),
];

export function renderLucideCircleUserRoundIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_USER_ROUND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-user-round-icon',
  prototypeName: 'lucide-circle-user-round-icon',
  shapeFactory: LUCIDE_CIRCLE_USER_ROUND_SHAPE_FACTORY,
});

export const asLucideCircleUserRoundIcon = fixed.asHook;
export const lucideCircleUserRoundIcon = fixed.prototype;
export default lucideCircleUserRoundIcon;
