// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-round' as const;
export const LUCIDE_USER_ROUND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 8, r: 5 }),
  svg.path({ d: 'M20 21a8 8 0 0 0-16 0' }),
];

export function renderLucideUserRoundIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_ROUND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-round-icon',
  prototypeName: 'lucide-user-round-icon',
  shapeFactory: LUCIDE_USER_ROUND_SHAPE_FACTORY,
});

export const asLucideUserRoundIcon = fixed.asHook;
export const lucideUserRoundIcon = fixed.prototype;
export default lucideUserRoundIcon;
