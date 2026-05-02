// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-check' as const;
export const LUCIDE_LIST_CHECK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 5H3' }),
  svg.path({ d: 'M16 12H3' }),
  svg.path({ d: 'M11 19H3' }),
  svg.path({ d: 'm15 18 2 2 4-4' }),
];

export function renderLucideListCheckIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_CHECK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-check-icon',
  prototypeName: 'lucide-list-check-icon',
  shapeFactory: LUCIDE_LIST_CHECK_SHAPE_FACTORY,
});

export const asLucideListCheckIcon = fixed.asHook;
export const lucideListCheckIcon = fixed.prototype;
export default lucideListCheckIcon;
