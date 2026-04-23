// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'sparkles' as const;
export const LUCIDE_SPARKLES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z',
  }),
  svg.path({ d: 'M20 2v4' }),
  svg.path({ d: 'M22 4h-4' }),
  svg.circle({ cx: 4, cy: 20, r: 2 }),
];

export function renderLucideSparklesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SPARKLES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-sparkles-icon',
  prototypeName: 'lucide-sparkles-icon',
  shapeFactory: LUCIDE_SPARKLES_SHAPE_FACTORY,
});

export const asLucideSparklesIcon = fixed.asHook;
export const lucideSparklesIcon = fixed.prototype;
export default lucideSparklesIcon;
