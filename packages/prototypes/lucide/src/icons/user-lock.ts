// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-lock' as const;
export const LUCIDE_USER_LOCK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19 16v-2a2 2 0 0 0-4 0v2' }),
  svg.path({ d: 'M9.5 15H7a4 4 0 0 0-4 4v2' }),
  svg.circle({ cx: 10, cy: 7, r: 4 }),
  svg.rect({ x: 13, y: 16, width: 8, height: 5, rx: '.899' }),
];

export function renderLucideUserLockIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_LOCK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-lock-icon',
  prototypeName: 'lucide-user-lock-icon',
  shapeFactory: LUCIDE_USER_LOCK_SHAPE_FACTORY,
});

export const asLucideUserLockIcon = fixed.asHook;
export const lucideUserLockIcon = fixed.prototype;
export default lucideUserLockIcon;
