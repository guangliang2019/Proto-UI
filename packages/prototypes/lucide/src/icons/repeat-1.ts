// AUTO-GENERATED FILE. DO NOT EDIT.
// Source: packages/prototypes/lucide/icons.config.json + lucide-static/icon-nodes.json

import { createLucideFixedIcon } from '../icon/fixed';
import type { LucideShapeFactory, SvgRendererHandle } from '../icon/contracts';
import { renderLucideShape, type RenderLucideShapeOptions } from '../icon/render';

export const LUCIDE_ICON_NAME = 'repeat-1' as const;
export const LUCIDE_REPEAT_1_SHAPE_FACTORY: LucideShapeFactory = (svg) => [
  svg.path({ d: 'm17 2 4 4-4 4' }),
  svg.path({ d: 'M3 11v-1a4 4 0 0 1 4-4h14' }),
  svg.path({ d: 'm7 22-4-4 4-4' }),
  svg.path({ d: 'M21 13v1a4 4 0 0 1-4 4H3' }),
  svg.path({ d: 'M11 10h1v4' }),
];

export function renderLucideRepeat1Icon(
  renderer: SvgRendererHandle,
  options: RenderLucideShapeOptions = {}
) {
  return renderLucideShape(renderer, LUCIDE_REPEAT_1_SHAPE_FACTORY, options);
}

const fixed = createLucideFixedIcon({
  asHookName: 'as-lucide-repeat-1-icon',
  prototypeName: 'lucide-repeat-1-icon',
  shapeFactory: LUCIDE_REPEAT_1_SHAPE_FACTORY,
});

export const asLucideRepeat1Icon = fixed.asHook;
export const lucideRepeat1Icon = fixed.prototype;
export default lucideRepeat1Icon;
