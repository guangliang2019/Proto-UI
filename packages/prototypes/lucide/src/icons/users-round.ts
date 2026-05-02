// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'users-round' as const;
export const LUCIDE_USERS_ROUND_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 21a8 8 0 0 0-16 0' }),
  svg.circle({ cx: 10, cy: 8, r: 5 }),
  svg.path({ d: 'M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3' }),
];

export function renderLucideUsersRoundIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USERS_ROUND_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-users-round-icon',
  prototypeName: 'lucide-users-round-icon',
  shapeFactory: LUCIDE_USERS_ROUND_SHAPE_FACTORY,
});

export const asLucideUsersRoundIcon = fixed.asHook;
export const lucideUsersRoundIcon = fixed.prototype;
export default lucideUsersRoundIcon;
