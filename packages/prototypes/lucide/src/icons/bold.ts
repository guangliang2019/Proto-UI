// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'bold' as const;
export const LUCIDE_BOLD_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8' });

export function renderLucideBoldIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BOLD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-bold-icon',
  prototypeName: 'lucide-bold-icon',
  shapeFactory: LUCIDE_BOLD_SHAPE_FACTORY,
});

export const asLucideBoldIcon = fixed.asHook;
export const lucideBoldIcon = fixed.prototype;
export default lucideBoldIcon;
