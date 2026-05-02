// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'square-stack' as const;
export const LUCIDE_SQUARE_STACK_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2' }),
  svg.path({ d: 'M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2' }),
  svg.rect({ width: 8, height: 8, x: 14, y: 14, rx: 2 }),
];

export function renderLucideSquareStackIcon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_SQUARE_STACK_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-square-stack-icon',
  prototypeName: 'lucide-square-stack-icon',
  shapeFactory: LUCIDE_SQUARE_STACK_SHAPE_FACTORY,
});

export const asLucideSquareStackIcon = fixed.asHook;
export const lucideSquareStackIcon = fixed.prototype;
export default lucideSquareStackIcon;
