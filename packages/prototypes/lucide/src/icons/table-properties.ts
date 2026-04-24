// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'table-properties' as const;
export const LUCIDE_TABLE_PROPERTIES_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M15 3v18' }),
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M21 9H3' }),
  svg.path({ d: 'M21 15H3' }),
];

export function renderLucideTablePropertiesIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TABLE_PROPERTIES_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-table-properties-icon',
  prototypeName: 'lucide-table-properties-icon',
  shapeFactory: LUCIDE_TABLE_PROPERTIES_SHAPE_FACTORY,
});

export const asLucideTablePropertiesIcon = fixed.asHook;
export const lucideTablePropertiesIcon = fixed.prototype;
export default lucideTablePropertiesIcon;
