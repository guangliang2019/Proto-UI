// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'text-quote' as const;
export const LUCIDE_TEXT_QUOTE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M17 5H3' }),
  svg.path({ d: 'M21 12H8' }),
  svg.path({ d: 'M21 19H8' }),
  svg.path({ d: 'M3 12v7' }),
];

export function renderLucideTextQuoteIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TEXT_QUOTE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-text-quote-icon',
  prototypeName: 'lucide-text-quote-icon',
  shapeFactory: LUCIDE_TEXT_QUOTE_SHAPE_FACTORY,
});

export const asLucideTextQuoteIcon = fixed.asHook;
export const lucideTextQuoteIcon = fixed.prototype;
export default lucideTextQuoteIcon;
