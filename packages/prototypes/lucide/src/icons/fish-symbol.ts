// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'fish-symbol' as const;
export const LUCIDE_FISH_SYMBOL_SHAPE_FACTORY: LucideShapeFactory = (svg) =>
  svg.path({ d: 'M2 16s9-15 20-4C11 23 2 8 2 8' });

export function renderLucideFishSymbolIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FISH_SYMBOL_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-fish-symbol-icon',
  prototypeName: 'lucide-fish-symbol-icon',
  shapeFactory: LUCIDE_FISH_SYMBOL_SHAPE_FACTORY,
});

export const asLucideFishSymbolIcon = fixed.asHook;
export const lucideFishSymbolIcon = fixed.prototype;
export default lucideFishSymbolIcon;
