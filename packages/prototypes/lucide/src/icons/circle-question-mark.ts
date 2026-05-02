// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'circle-question-mark' as const;
export const LUCIDE_CIRCLE_QUESTION_MARK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.circle({ cx: 12, cy: 12, r: 10 }),
  svg.path({ d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' }),
  svg.path({ d: 'M12 17h.01' }),
];

export function renderLucideCircleQuestionMarkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_CIRCLE_QUESTION_MARK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-circle-question-mark-icon',
  prototypeName: 'lucide-circle-question-mark-icon',
  shapeFactory: LUCIDE_CIRCLE_QUESTION_MARK_SHAPE_FACTORY,
});

export const asLucideCircleQuestionMarkIcon = fixed.asHook;
export const lucideCircleQuestionMarkIcon = fixed.prototype;
export default lucideCircleQuestionMarkIcon;
