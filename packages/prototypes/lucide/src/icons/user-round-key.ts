// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-round-key' as const;
export const LUCIDE_USER_ROUND_KEY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M19 11v6' }),
  svg.path({ d: 'M19 13h2' }),
  svg.path({ d: 'M2 21a8 8 0 0 1 12.868-6.349' }),
  svg.circle({ cx: 10, cy: 8, r: 5 }),
  svg.circle({ cx: 19, cy: 19, r: 2 }),
];

export function renderLucideUserRoundKeyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_ROUND_KEY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-round-key-icon',
  prototypeName: 'lucide-user-round-key-icon',
  shapeFactory: LUCIDE_USER_ROUND_KEY_SHAPE_FACTORY,
});

export const asLucideUserRoundKeyIcon = fixed.asHook;
export const lucideUserRoundKeyIcon = fixed.prototype;
export default lucideUserRoundKeyIcon;
