// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'layout-list' as const;
export const LUCIDE_LAYOUT_LIST_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 7, height: 7, x: 3, y: 3, rx: 1 }),
  svg.rect({ width: 7, height: 7, x: 3, y: 14, rx: 1 }),
  svg.path({ d: 'M14 4h7' }),
  svg.path({ d: 'M14 9h7' }),
  svg.path({ d: 'M14 15h7' }),
  svg.path({ d: 'M14 20h7' }),
];

export function renderLucideLayoutListIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_LAYOUT_LIST_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-layout-list-icon',
  prototypeName: 'lucide-layout-list-icon',
  shapeFactory: LUCIDE_LAYOUT_LIST_SHAPE_FACTORY,
});

export const asLucideLayoutListIcon = fixed.asHook;
export const lucideLayoutListIcon = fixed.prototype;
export default lucideLayoutListIcon;
