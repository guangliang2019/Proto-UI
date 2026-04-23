// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-plus' as const;
export const LUCIDE_USER_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
  svg.circle({ cx: 9, cy: 7, r: 4 }),
  svg.line({ x1: 19, x2: 19, y1: 8, y2: 14 }),
  svg.line({ x1: 22, x2: 16, y1: 11, y2: 11 }),
];

export function renderLucideUserPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-plus-icon',
  prototypeName: 'lucide-user-plus-icon',
  shapeFactory: LUCIDE_USER_PLUS_SHAPE_FACTORY,
});

export const asLucideUserPlusIcon = fixed.asHook;
export const lucideUserPlusIcon = fixed.prototype;
export default lucideUserPlusIcon;
