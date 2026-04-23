// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'search-code' as const;
export const LUCIDE_SEARCH_CODE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm13 13.5 2-2.5-2-2.5' }),
  svg.path({ d: 'm21 21-4.3-4.3' }),
  svg.path({ d: 'M9 8.5 7 11l2 2.5' }),
  svg.circle({ cx: 11, cy: 11, r: 8 }),
];

export function renderLucideSearchCodeIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SEARCH_CODE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-search-code-icon',
  prototypeName: 'lucide-search-code-icon',
  shapeFactory: LUCIDE_SEARCH_CODE_SHAPE_FACTORY,
});

export const asLucideSearchCodeIcon = fixed.asHook;
export const lucideSearchCodeIcon = fixed.prototype;
export default lucideSearchCodeIcon;
