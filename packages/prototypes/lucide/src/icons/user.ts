// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user' as const;
export const LUCIDE_USER_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' }),
  svg.circle({ cx: 12, cy: 7, r: 4 }),
];

export function renderLucideUserIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-icon',
  prototypeName: 'lucide-user-icon',
  shapeFactory: LUCIDE_USER_SHAPE_FACTORY,
});

export const asLucideUserIcon = fixed.asHook;
export const lucideUserIcon = fixed.prototype;
export default lucideUserIcon;
