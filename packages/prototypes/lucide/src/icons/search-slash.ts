// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'search-slash' as const;
export const LUCIDE_SEARCH_SLASH_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm13.5 8.5-5 5' }),
  svg.circle({ cx: 11, cy: 11, r: 8 }),
  svg.path({ d: 'm21 21-4.3-4.3' }),
];

export function renderLucideSearchSlashIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SEARCH_SLASH_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-search-slash-icon',
  prototypeName: 'lucide-search-slash-icon',
  shapeFactory: LUCIDE_SEARCH_SLASH_SHAPE_FACTORY,
});

export const asLucideSearchSlashIcon = fixed.asHook;
export const lucideSearchSlashIcon = fixed.prototype;
export default lucideSearchSlashIcon;
