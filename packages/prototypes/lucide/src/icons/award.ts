// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'award' as const;
export const LUCIDE_AWARD_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'm15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526',
  }),
  svg.circle({ cx: 12, cy: 8, r: 6 }),
];

export function renderLucideAwardIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_AWARD_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-award-icon',
  prototypeName: 'lucide-award-icon',
  shapeFactory: LUCIDE_AWARD_SHAPE_FACTORY,
});

export const asLucideAwardIcon = fixed.asHook;
export const lucideAwardIcon = fixed.prototype;
export default lucideAwardIcon;
