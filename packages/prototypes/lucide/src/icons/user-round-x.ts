// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-round-x' as const;
export const LUCIDE_USER_ROUND_X_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M2 21a8 8 0 0 1 11.873-7' }),
  svg.circle({ cx: 10, cy: 8, r: 5 }),
  svg.path({ d: 'm17 17 5 5' }),
  svg.path({ d: 'm22 17-5 5' }),
];

export function renderLucideUserRoundXIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_ROUND_X_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-round-x-icon',
  prototypeName: 'lucide-user-round-x-icon',
  shapeFactory: LUCIDE_USER_ROUND_X_SHAPE_FACTORY,
});

export const asLucideUserRoundXIcon = fixed.asHook;
export const lucideUserRoundXIcon = fixed.prototype;
export default lucideUserRoundXIcon;
