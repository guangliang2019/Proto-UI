// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-plus' as const;
export const LUCIDE_SQUARE_PLUS_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M8 12h8' }),
  svg.path({ d: 'M12 8v8' }),
];

export function renderLucideSquarePlusIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_PLUS_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-plus-icon',
  prototypeName: 'lucide-square-plus-icon',
  shapeFactory: LUCIDE_SQUARE_PLUS_SHAPE_FACTORY,
});

export const asLucideSquarePlusIcon = fixed.asHook;
export const lucideSquarePlusIcon = fixed.prototype;
export default lucideSquarePlusIcon;
