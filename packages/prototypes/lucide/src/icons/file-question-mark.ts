// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'file-question-mark' as const;
export const LUCIDE_FILE_QUESTION_MARK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
  }),
  svg.path({ d: 'M12 17h.01' }),
  svg.path({ d: 'M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3' }),
];

export function renderLucideFileQuestionMarkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_FILE_QUESTION_MARK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-file-question-mark-icon',
  prototypeName: 'lucide-file-question-mark-icon',
  shapeFactory: LUCIDE_FILE_QUESTION_MARK_SHAPE_FACTORY,
});

export const asLucideFileQuestionMarkIcon = fixed.asHook;
export const lucideFileQuestionMarkIcon = fixed.prototype;
export default lucideFileQuestionMarkIcon;
