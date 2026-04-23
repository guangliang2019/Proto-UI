// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'columns-4' as const;
export const LUCIDE_COLUMNS_4_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M7.5 3v18' }),
  svg.path({ d: 'M12 3v18' }),
  svg.path({ d: 'M16.5 3v18' }),
];

export function renderLucideColumns4Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_COLUMNS_4_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-columns-4-icon',
  prototypeName: 'lucide-columns-4-icon',
  shapeFactory: LUCIDE_COLUMNS_4_SHAPE_FACTORY,
});

export const asLucideColumns4Icon = fixed.asHook;
export const lucideColumns4Icon = fixed.prototype;
export default lucideColumns4Icon;
