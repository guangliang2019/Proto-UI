// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mail-question-mark' as const;
export const LUCIDE_MAIL_QUESTION_MARK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5' }),
  svg.path({ d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' }),
  svg.path({ d: 'M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2' }),
  svg.path({ d: 'M20 22v.01' }),
];

export function renderLucideMailQuestionMarkIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAIL_QUESTION_MARK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mail-question-mark-icon',
  prototypeName: 'lucide-mail-question-mark-icon',
  shapeFactory: LUCIDE_MAIL_QUESTION_MARK_SHAPE_FACTORY,
});

export const asLucideMailQuestionMarkIcon = fixed.asHook;
export const lucideMailQuestionMarkIcon = fixed.prototype;
export default lucideMailQuestionMarkIcon;
