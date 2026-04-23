// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'wand-sparkles' as const;
export const LUCIDE_WAND_SPARKLES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72',
  }),
  svg.path({ d: 'm14 7 3 3' }),
  svg.path({ d: 'M5 6v4' }),
  svg.path({ d: 'M19 14v4' }),
  svg.path({ d: 'M10 2v2' }),
  svg.path({ d: 'M7 8H3' }),
  svg.path({ d: 'M21 16h-4' }),
  svg.path({ d: 'M11 3H9' }),
];

export function renderLucideWandSparklesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_WAND_SPARKLES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-wand-sparkles-icon',
  prototypeName: 'lucide-wand-sparkles-icon',
  shapeFactory: LUCIDE_WAND_SPARKLES_SHAPE_FACTORY,
});

export const asLucideWandSparklesIcon = fixed.asHook;
export const lucideWandSparklesIcon = fixed.prototype;
export default lucideWandSparklesIcon;
