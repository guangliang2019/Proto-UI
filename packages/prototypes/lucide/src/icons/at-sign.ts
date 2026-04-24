// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'at-sign' as const;
export const LUCIDE_AT_SIGN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 4 }),
  svg.path({ d: 'M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8' }),
];

export function renderLucideAtSignIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_AT_SIGN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-at-sign-icon',
  prototypeName: 'lucide-at-sign-icon',
  shapeFactory: LUCIDE_AT_SIGN_SHAPE_FACTORY,
});

export const asLucideAtSignIcon = fixed.asHook;
export const lucideAtSignIcon = fixed.prototype;
export default lucideAtSignIcon;
