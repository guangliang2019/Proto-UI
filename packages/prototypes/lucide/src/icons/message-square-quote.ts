// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'message-square-quote' as const;
export const LUCIDE_MESSAGE_SQUARE_QUOTE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M14 14a2 2 0 0 0 2-2V8h-2' }),
  svg.path({
    d: 'M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z',
  }),
  svg.path({ d: 'M8 14a2 2 0 0 0 2-2V8H8' }),
];

export function renderLucideMessageSquareQuoteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MESSAGE_SQUARE_QUOTE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-message-square-quote-icon',
  prototypeName: 'lucide-message-square-quote-icon',
  shapeFactory: LUCIDE_MESSAGE_SQUARE_QUOTE_SHAPE_FACTORY,
});

export const asLucideMessageSquareQuoteIcon = fixed.asHook;
export const lucideMessageSquareQuoteIcon = fixed.prototype;
export default lucideMessageSquareQuoteIcon;
