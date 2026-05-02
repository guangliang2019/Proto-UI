// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'mail-search' as const;
export const LUCIDE_MAIL_SEARCH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5' }),
  svg.path({ d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' }),
  svg.path({ d: 'M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' }),
  svg.circle({ cx: 18, cy: 18, r: 3 }),
  svg.path({ d: 'm22 22-1.5-1.5' }),
];

export function renderLucideMailSearchIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_MAIL_SEARCH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-mail-search-icon',
  prototypeName: 'lucide-mail-search-icon',
  shapeFactory: LUCIDE_MAIL_SEARCH_SHAPE_FACTORY,
});

export const asLucideMailSearchIcon = fixed.asHook;
export const lucideMailSearchIcon = fixed.prototype;
export default lucideMailSearchIcon;
