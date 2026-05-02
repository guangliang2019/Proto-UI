// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'dot' as const;
export const LUCIDE_DOT_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.circle({ cx: 12.1, cy: 12.1, r: 1 });

export function renderLucideDotIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_DOT_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-dot-icon',
  prototypeName: 'lucide-dot-icon',
  shapeFactory: LUCIDE_DOT_SHAPE_FACTORY,
});

export const asLucideDotIcon = fixed.asHook;
export const lucideDotIcon = fixed.prototype;
export default lucideDotIcon;
