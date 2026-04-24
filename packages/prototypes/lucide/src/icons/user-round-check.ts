// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-round-check' as const;
export const LUCIDE_USER_ROUND_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 21a8 8 0 0 1 13.292-6' }),
  svg.circle({ cx: 10, cy: 8, r: 5 }),
  svg.path({ d: 'm16 19 2 2 4-4' }),
];

export function renderLucideUserRoundCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_ROUND_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-round-check-icon',
  prototypeName: 'lucide-user-round-check-icon',
  shapeFactory: LUCIDE_USER_ROUND_CHECK_SHAPE_FACTORY,
});

export const asLucideUserRoundCheckIcon = fixed.asHook;
export const lucideUserRoundCheckIcon = fixed.prototype;
export default lucideUserRoundCheckIcon;
