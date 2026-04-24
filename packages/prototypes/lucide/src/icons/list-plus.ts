// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-plus' as const;
export const LUCIDE_LIST_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M16 5H3' }),
  svg.path({ d: 'M11 12H3' }),
  svg.path({ d: 'M16 19H3' }),
  svg.path({ d: 'M18 9v6' }),
  svg.path({ d: 'M21 12h-6' }),
];

export function renderLucideListPlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-plus-icon',
  prototypeName: 'lucide-list-plus-icon',
  shapeFactory: LUCIDE_LIST_PLUS_SHAPE_FACTORY,
});

export const asLucideListPlusIcon = fixed.asHook;
export const lucideListPlusIcon = fixed.prototype;
export default lucideListPlusIcon;
