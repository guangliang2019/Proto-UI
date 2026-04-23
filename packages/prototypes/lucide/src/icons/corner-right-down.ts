// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'corner-right-down' as const;
export const LUCIDE_CORNER_RIGHT_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm10 15 5 5 5-5' }),
  svg.path({ d: 'M4 4h7a4 4 0 0 1 4 4v12' }),
];

export function renderLucideCornerRightDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CORNER_RIGHT_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-corner-right-down-icon',
  prototypeName: 'lucide-corner-right-down-icon',
  shapeFactory: LUCIDE_CORNER_RIGHT_DOWN_SHAPE_FACTORY,
});

export const asLucideCornerRightDownIcon = fixed.asHook;
export const lucideCornerRightDownIcon = fixed.prototype;
export default lucideCornerRightDownIcon;
