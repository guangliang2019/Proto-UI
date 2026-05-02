// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-check' as const;
export const LUCIDE_USER_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm16 11 2 2 4-4' }),
  svg.path({ d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
  svg.circle({ cx: 9, cy: 7, r: 4 }),
];

export function renderLucideUserCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-check-icon',
  prototypeName: 'lucide-user-check-icon',
  shapeFactory: LUCIDE_USER_CHECK_SHAPE_FACTORY,
});

export const asLucideUserCheckIcon = fixed.asHook;
export const lucideUserCheckIcon = fixed.prototype;
export default lucideUserCheckIcon;
