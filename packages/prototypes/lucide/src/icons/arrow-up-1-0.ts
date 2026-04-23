// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'arrow-up-1-0' as const;
export const LUCIDE_ARROW_UP_1_0_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm3 8 4-4 4 4' }),
  svg.path({ d: 'M7 4v16' }),
  svg.path({ d: 'M17 10V4h-2' }),
  svg.path({ d: 'M15 10h4' }),
  svg.rect({ x: 15, y: 14, width: 4, height: 6, ry: 2 }),
];

export function renderLucideArrowUp10Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_ARROW_UP_1_0_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-arrow-up-1-0-icon',
  prototypeName: 'lucide-arrow-up-1-0-icon',
  shapeFactory: LUCIDE_ARROW_UP_1_0_SHAPE_FACTORY,
});

export const asLucideArrowUp10Icon = fixed.asHook;
export const lucideArrowUp10Icon = fixed.prototype;
export default lucideArrowUp10Icon;
