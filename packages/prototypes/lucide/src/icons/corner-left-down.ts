// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'corner-left-down' as const;
export const LUCIDE_CORNER_LEFT_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm14 15-5 5-5-5' }),
  svg.path({ d: 'M20 4h-7a4 4 0 0 0-4 4v12' }),
];

export function renderLucideCornerLeftDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CORNER_LEFT_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-corner-left-down-icon',
  prototypeName: 'lucide-corner-left-down-icon',
  shapeFactory: LUCIDE_CORNER_LEFT_DOWN_SHAPE_FACTORY,
});

export const asLucideCornerLeftDownIcon = fixed.asHook;
export const lucideCornerLeftDownIcon = fixed.prototype;
export default lucideCornerLeftDownIcon;
