// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'users' as const;
export const LUCIDE_USERS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
  svg.path({ d: 'M16 3.128a4 4 0 0 1 0 7.744' }),
  svg.path({ d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
  svg.circle({ cx: 9, cy: 7, r: 4 }),
];

export function renderLucideUsersIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USERS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-users-icon',
  prototypeName: 'lucide-users-icon',
  shapeFactory: LUCIDE_USERS_SHAPE_FACTORY,
});

export const asLucideUsersIcon = fixed.asHook;
export const lucideUsersIcon = fixed.prototype;
export default lucideUsersIcon;
