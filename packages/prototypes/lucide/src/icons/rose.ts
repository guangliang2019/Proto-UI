// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'rose' as const;
export const LUCIDE_ROSE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M17 10h-1a4 4 0 1 1 4-4v.534' }),
  svg.path({ d: 'M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31' }),
  svg.path({
    d: 'M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2',
  }),
  svg.path({ d: 'M9.77 12C4 15 2 22 2 22' }),
  svg.circle({ cx: 17, cy: 8, r: 2 }),
];

export function renderLucideRoseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ROSE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-rose-icon',
  prototypeName: 'lucide-rose-icon',
  shapeFactory: LUCIDE_ROSE_SHAPE_FACTORY,
});

export const asLucideRoseIcon = fixed.asHook;
export const lucideRoseIcon = fixed.prototype;
export default lucideRoseIcon;
