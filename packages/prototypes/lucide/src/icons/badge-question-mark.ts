// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'badge-question-mark' as const;
export const LUCIDE_BADGE_QUESTION_MARK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
  }),
  svg.path({ d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' }),
  svg.line({ x1: 12, x2: 12.01, y1: 17, y2: 17 }),
];

export function renderLucideBadgeQuestionMarkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_BADGE_QUESTION_MARK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-badge-question-mark-icon',
  prototypeName: 'lucide-badge-question-mark-icon',
  shapeFactory: LUCIDE_BADGE_QUESTION_MARK_SHAPE_FACTORY,
});

export const asLucideBadgeQuestionMarkIcon = fixed.asHook;
export const lucideBadgeQuestionMarkIcon = fixed.prototype;
export default lucideBadgeQuestionMarkIcon;
