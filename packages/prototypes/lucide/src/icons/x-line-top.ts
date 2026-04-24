// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'x-line-top' as const;
export const LUCIDE_X_LINE_TOP_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M18 4H6' }),
  svg.path({ d: 'M18 8 6 20' }),
  svg.path({ d: 'm6 8 12 12' }),
];

export function renderLucideXLineTopIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_X_LINE_TOP_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-x-line-top-icon',
  prototypeName: 'lucide-x-line-top-icon',
  shapeFactory: LUCIDE_X_LINE_TOP_SHAPE_FACTORY,
});

export const asLucideXLineTopIcon = fixed.asHook;
export const lucideXLineTopIcon = fixed.prototype;
export default lucideXLineTopIcon;
