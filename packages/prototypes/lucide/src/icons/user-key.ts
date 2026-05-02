// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'user-key' as const;
export const LUCIDE_USER_KEY_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M20 11v6' }),
  svg.path({ d: 'M20 13h2' }),
  svg.path({ d: 'M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578' }),
  svg.circle({ cx: 10, cy: 7, r: 4 }),
  svg.circle({ cx: 20, cy: 19, r: 2 }),
];

export function renderLucideUserKeyIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_USER_KEY_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-user-key-icon',
  prototypeName: 'lucide-user-key-icon',
  shapeFactory: LUCIDE_USER_KEY_SHAPE_FACTORY,
});

export const asLucideUserKeyIcon = fixed.asHook;
export const lucideUserKeyIcon = fixed.prototype;
export default lucideUserKeyIcon;
