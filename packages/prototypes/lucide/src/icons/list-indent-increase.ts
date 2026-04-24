// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'list-indent-increase' as const;
export const LUCIDE_LIST_INDENT_INCREASE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M21 5H11' }),
  svg.path({ d: 'M21 12H11' }),
  svg.path({ d: 'M21 19H11' }),
  svg.path({ d: 'm3 8 4 4-4 4' }),
];

export function renderLucideListIndentIncreaseIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LIST_INDENT_INCREASE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-list-indent-increase-icon',
  prototypeName: 'lucide-list-indent-increase-icon',
  shapeFactory: LUCIDE_LIST_INDENT_INCREASE_SHAPE_FACTORY,
});

export const asLucideListIndentIncreaseIcon = fixed.asHook;
export const lucideListIndentIncreaseIcon = fixed.prototype;
export default lucideListIndentIncreaseIcon;
