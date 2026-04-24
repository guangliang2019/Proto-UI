// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'message-square-diff' as const;
export const LUCIDE_MESSAGE_SQUARE_DIFF_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({
    d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
  }),
  svg.path({ d: 'M10 15h4' }),
  svg.path({ d: 'M10 9h4' }),
  svg.path({ d: 'M12 7v4' }),
];

export function renderLucideMessageSquareDiffIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MESSAGE_SQUARE_DIFF_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-message-square-diff-icon',
  prototypeName: 'lucide-message-square-diff-icon',
  shapeFactory: LUCIDE_MESSAGE_SQUARE_DIFF_SHAPE_FACTORY,
});

export const asLucideMessageSquareDiffIcon = fixed.asHook;
export const lucideMessageSquareDiffIcon = fixed.prototype;
export default lucideMessageSquareDiffIcon;
