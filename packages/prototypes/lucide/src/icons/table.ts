// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'table' as const;
export const LUCIDE_TABLE_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M12 3v18' }),
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M3 9h18' }),
  svg.path({ d: 'M3 15h18' }),
];

export function renderLucideTableIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_TABLE_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-table-icon',
  prototypeName: 'lucide-table-icon',
  shapeFactory: LUCIDE_TABLE_SHAPE_FACTORY,
});

export const asLucideTableIcon = fixed.asHook;
export const lucideTableIcon = fixed.prototype;
export default lucideTableIcon;
