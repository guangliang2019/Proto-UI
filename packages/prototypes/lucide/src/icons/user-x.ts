// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-x' as const;
export const LUCIDE_USER_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
  svg.circle({ cx: 9, cy: 7, r: 4 }),
  svg.line({ x1: 17, x2: 22, y1: 8, y2: 13 }),
  svg.line({ x1: 22, x2: 17, y1: 8, y2: 13 }),
];

export function renderLucideUserXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-x-icon',
  prototypeName: 'lucide-user-x-icon',
  shapeFactory: LUCIDE_USER_X_SHAPE_FACTORY,
});

export const asLucideUserXIcon = fixed.asHook;
export const lucideUserXIcon = fixed.prototype;
export default lucideUserXIcon;
