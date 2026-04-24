// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'corner-up-left' as const;
export const LUCIDE_CORNER_UP_LEFT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M20 20v-7a4 4 0 0 0-4-4H4' }),
  svg.path({ d: 'M9 14 4 9l5-5' }),
];

export function renderLucideCornerUpLeftIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CORNER_UP_LEFT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-corner-up-left-icon',
  prototypeName: 'lucide-corner-up-left-icon',
  shapeFactory: LUCIDE_CORNER_UP_LEFT_SHAPE_FACTORY,
});

export const asLucideCornerUpLeftIcon = fixed.asHook;
export const lucideCornerUpLeftIcon = fixed.prototype;
export default lucideCornerUpLeftIcon;
