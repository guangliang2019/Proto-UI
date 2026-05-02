// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-arrow-down' as const;
export const LUCIDE_SQUARE_ARROW_DOWN_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.rect({ width: 18, height: 18, x: 3, y: 3, rx: 2 }),
  svg.path({ d: 'M12 8v8' }),
  svg.path({ d: 'm8 12 4 4 4-4' }),
];

export function renderLucideSquareArrowDownIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_ARROW_DOWN_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-arrow-down-icon',
  prototypeName: 'lucide-square-arrow-down-icon',
  shapeFactory: LUCIDE_SQUARE_ARROW_DOWN_SHAPE_FACTORY,
});

export const asLucideSquareArrowDownIcon = fixed.asHook;
export const lucideSquareArrowDownIcon = fixed.prototype;
export default lucideSquareArrowDownIcon;
