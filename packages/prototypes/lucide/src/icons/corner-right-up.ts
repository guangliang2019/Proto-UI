// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'corner-right-up' as const;
export const LUCIDE_CORNER_RIGHT_UP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10 9 5-5 5 5' }),
  svg.path({ d: 'M4 20h7a4 4 0 0 0 4-4V4' }),
];

export function renderLucideCornerRightUpIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CORNER_RIGHT_UP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-corner-right-up-icon',
  prototypeName: 'lucide-corner-right-up-icon',
  shapeFactory: LUCIDE_CORNER_RIGHT_UP_SHAPE_FACTORY,
});

export const asLucideCornerRightUpIcon = fixed.asHook;
export const lucideCornerRightUpIcon = fixed.prototype;
export default lucideCornerRightUpIcon;
