// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'corner-down-right' as const;
export const LUCIDE_CORNER_DOWN_RIGHT_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm15 10 5 5-5 5' }),
  svg.path({ d: 'M4 4v7a4 4 0 0 0 4 4h12' }),
];

export function renderLucideCornerDownRightIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CORNER_DOWN_RIGHT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-corner-down-right-icon',
  prototypeName: 'lucide-corner-down-right-icon',
  shapeFactory: LUCIDE_CORNER_DOWN_RIGHT_SHAPE_FACTORY,
});

export const asLucideCornerDownRightIcon = fixed.asHook;
export const lucideCornerDownRightIcon = fixed.prototype;
export default lucideCornerDownRightIcon;
